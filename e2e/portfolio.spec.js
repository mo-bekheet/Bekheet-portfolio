import { test, expect } from '@playwright/test';

async function gotoPage(page, path = '/') {
  await page.goto(path);
  await page
    .waitForSelector('#preloader', { state: 'detached', timeout: 30_000 })
    .catch(() => {});
}

test.describe('Navigation', () => {
  test('home page loads with hero content', async ({ page }) => {
    await gotoPage(page);
    await expect(page).toHaveTitle(/Mohamed Bekheet/);
    await expect(page.getByText(/Hi There!/)).toBeVisible();
    await expect(page.getByRole('heading', { name: /I'M/ })).toBeVisible();
  });

  test('all nav routes render key content', async ({ page }) => {
    const routes = [
      { path: '/about', pattern: /Cairo, Egypt|Machine Learning Engineer.*deploys/i },
      { path: '/project', pattern: /CopticTrans|AWS EMR/i },
      { path: '/certificate', pattern: /AWS Certified/i },
      { path: '/resume', pattern: /Download Full CV/i }
    ];
    for (const { path, pattern } of routes) {
      await gotoPage(page, path);
      await expect(page.getByText(pattern).first()).toBeVisible();
    }
  });

  test('unknown route redirects to home', async ({ page }) => {
    await gotoPage(page, '/this-page-does-not-exist');
    await expect(page.getByText(/Hi There!/)).toBeVisible();
  });
});

test.describe('Contact form', () => {
  test('form fields accept input', async ({ page }) => {
    await gotoPage(page);
    await page.getByPlaceholder('Your Name').fill('Test User');
    await page.getByPlaceholder('Your email').fill('test@example.com');
    await page.getByPlaceholder('Message').fill('Hello from automated test');
    await expect(page.getByPlaceholder('Your Name')).toHaveValue('Test User');
    await expect(page.getByPlaceholder('Your email')).toHaveValue('test@example.com');
  });
});

test.describe('Chatbot', () => {
  test('chatbot toggle opens chat window', async ({ page }) => {
    await gotoPage(page);
    const toggle = page.locator('button[class*=chatbot-toggle]');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator('.chatbot-container')).toBeVisible();
    await expect(page.locator('.chatbot-header')).toContainText('AI Assistant');
  });

  test('chatbot can be closed', async ({ page }) => {
    await gotoPage(page);
    const toggle = page.locator('button[class*=chatbot-toggle]');
    await toggle.click();
    await expect(page.locator('.chatbot-container')).toBeVisible();
    await page.locator('.close-button').click();
    await expect(page.locator('.chatbot-container')).not.toBeVisible();
  });
});

test.describe('Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile hamburger menu opens navigation links', async ({ page }) => {
    await gotoPage(page);
    const toggle = page.getByRole('button', { name: 'Toggle navigation' });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Resume' })).toBeVisible();
  });

  test('projects page renders cards on mobile', async ({ page }) => {
    await gotoPage(page, '/project');
    const githubButtons = page.getByRole('button', { name: 'GitHub' });
    await expect(githubButtons.first()).toBeVisible();
    expect(await githubButtons.count()).toBe(9);
  });
});

test.describe('Console health', () => {
  test('home page has no unexpected console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await gotoPage(page);
    await page.waitForTimeout(3000);
    const reactErrors = errors.filter(
      (e) => !/favicon|net::|404|Google Fonts|fonts.googleapis/.test(e)
    );
    expect(reactErrors).toEqual([]);
  });
});
