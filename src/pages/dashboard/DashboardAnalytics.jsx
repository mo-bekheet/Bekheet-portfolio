import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import InsightsIcon from '@mui/icons-material/Insights';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupIcon from '@mui/icons-material/Group';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import MailIcon from '@mui/icons-material/Mail';
import { fetchAnalytics } from '../../lib/api';

const PURPLE = '#c770f0';
const PIE_COLORS = ['#c770f0', '#7c4dff', '#00b8d4', '#ffab40', '#ef5350'];
const AXIS_STYLE = { fontSize: 12, fill: '#9e9e9e' };
const TOOLTIP_PROPS = {
  slotProps: {
    tooltip: {
      sx: {
        bgcolor: '#15121f',
        border: '1px solid rgba(199, 112, 240, 0.3)',
        borderRadius: 2
      }
    }
  }
};

const DEVICE_LABELS = { mobile: 'Mobile', desktop: 'Desktop', tablet: 'Tablet' };

function StatCard({ icon, label, value }) {
  return (
    <Card variant="outlined" sx={{ flex: 1, minWidth: 150 }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ color: PURPLE }}>{icon}</Box>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DashboardAnalytics() {
  const [rangeDays, setRangeDays] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (days) => {
    setLoading(true);
    try {
      const result = await fetchAnalytics(days);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(rangeDays);
  }, [load, rangeDays]);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h5" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InsightsIcon sx={{ color: PURPLE }} /> Analytics
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToggleButtonGroup
          size="small"
          value={rangeDays}
          exclusive
          onChange={(e, value) => value && setRangeDays(value)}
        >
          {[7, 30].map((days) => (
            <ToggleButton key={days} value={days}>
              Last {days} days
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button onClick={() => load(rangeDays)}>Refresh</Button>
      </Box>

      {error && <Alert severity="warning">Could not load analytics: {error}</Alert>}

      {!loading && !error && data && (
        <>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <StatCard icon={<VisibilityIcon />} label="Page views" value={data.totals.views.toLocaleString()} />
            <StatCard icon={<GroupIcon />} label="Unique visitors" value={data.totals.uniqueVisitors.toLocaleString()} />
            <StatCard icon={<AdsClickIcon />} label="Link clicks" value={data.totals.linkClicks.toLocaleString()} />
            <StatCard icon={<MailIcon />} label="Unread messages" value={data.totals.unreadMessages.toLocaleString()} />
          </Stack>

          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight={700} mb={2}>Views per day</Typography>
              <LineChart
                height={280}
                margin={{ left: 8, right: 16 }}
                xAxis={[
                  {
                    scaleType: 'point',
                    data: data.dailySeries.map((d) => d.date),
                    tickLabelStyle: AXIS_STYLE
                  }
                ]}
                yAxis={[{ tickLabelStyle: AXIS_STYLE, disableLine: true, disableTicks: true }]}
                series={[
                  {
                    data: data.dailySeries.map((d) => d.views),
                    label: 'Views',
                    color: PURPLE,
                    showMark: false
                  }
                ]}
                grid={{ horizontal: true }}
                slotProps={{
                  legend: { hidden: true },
                  ...TOOLTIP_PROPS.slotProps
                }}
                sx={{ '& .MuiLineElement-root': { strokeWidth: 2 } }}
              />
            </CardContent>
          </Card>

          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
            <Card variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Typography fontWeight={700} mb={2}>Top pages</Typography>
                {data.topPages.length === 0 ? (
                  <Alert severity="info" variant="outlined">No visits recorded yet.</Alert>
                ) : (
                  <BarChart
                    height={260}
                    layout="vertical"
                    margin={{ left: 60, right: 16 }}
                    yAxis={[
                      {
                        scaleType: 'band',
                        data: data.topPages.map((p) => p.label),
                        tickLabelStyle: AXIS_STYLE
                      }
                    ]}
                    xAxis={[{ tickLabelStyle: AXIS_STYLE, disableLine: true, disableTicks: true }]}
                    series={[{ data: data.topPages.map((p) => p.count), color: PURPLE, label: 'Visits' }]}
                    slotProps={{
                      legend: { hidden: true },
                      ...TOOLTIP_PROPS.slotProps
                    }}
                  />
                )}
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Typography fontWeight={700} mb={2}>Most clicked links</Typography>
                {data.topLinks.length === 0 ? (
                  <Alert severity="info" variant="outlined">
                    No outbound link clicks yet.
                  </Alert>
                ) : (
                  <Stack spacing={1}>
                    {data.topLinks.map((link) => (
                      <Tooltip key={link.url} title={link.url} placement="right">
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Typography variant="body2" noWrap sx={{ flex: 1, maxWidth: 320 }}>
                            {link.label}
                          </Typography>
                          <Box
                            sx={{
                              height: 10,
                              borderRadius: 5,
                              bgcolor: PURPLE,
                              minWidth: 6,
                              width: `${Math.max(4, (link.count / data.topLinks[0].count) * 100)}%`
                            }}
                          />
                          <Typography variant="body2" fontWeight={700}>{link.count}</Typography>
                        </Stack>
                      </Tooltip>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
            <Card variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Typography fontWeight={700} mb={2}>Devices</Typography>
                {data.devices.length === 0 ? (
                  <Alert severity="info" variant="outlined">No device data yet.</Alert>
                ) : (
                  <PieChart
                    height={260}
                    series={[
                      {
                        data: data.devices.map((device, index) => ({
                          id: device.label,
                          value: device.value,
                          label: DEVICE_LABELS[device.label] || device.label,
                          color: PIE_COLORS[index % PIE_COLORS.length]
                        })),
                        innerRadius: 55,
                        outerRadius: 85,
                        paddingAngle: 3
                      }
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        itemMarkWidth: 10,
                        itemMarkHeight: 10,
                        labelStyle: { fontSize: 13 }
                      },
                      ...TOOLTIP_PROPS.slotProps
                    }}
                  />
                )}
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Typography fontWeight={700} mb={2}>Top referrers</Typography>
                {data.referrers.length === 0 ? (
                  <Alert severity="info" variant="outlined">
                    No external referrers recorded yet.
                  </Alert>
                ) : (
                  <Stack spacing={1}>
                    {data.referrers.map((referrer) => (
                      <Stack key={referrer.host} direction="row" justifyContent="space-between">
                        <Typography variant="body2">{referrer.host}</Typography>
                        <Typography variant="body2" fontWeight={700}>{referrer.count}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Stack>
        </>
      )}
    </Stack>
  );
}
