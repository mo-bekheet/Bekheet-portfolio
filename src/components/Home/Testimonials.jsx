import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sampleTestimonials as staticTestimonials } from '../../content/index.js';
import { useContent } from '../../hooks/useContent';
const imgStyle = {
  width: '150px',
  height: '150px',
  objectFit: 'cover', // Keeps the aspect ratio intact
};

const imgStyle2 = {
  width: '70px',
  height: '70px',
  margin: '40px',
  borderRadius: '50%',
  border: '2px solid #c770f0',
  transition: 'transform 0.3s ease-in-out'
};

const CustomArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block'}}
    onClick={onClick}
  />
);

const Testimonials = () => {
  const { content } = useContent('testimonials');
  const testimonials = (content ?? []).map((t, i) => {
    const fallback =
      staticTestimonials.find(
        (s) => s.clientName === (t.clientName ?? t.client_name)
      ) ?? {};
    return {
      id: t.id ?? i,
      imgSrc: t.imgSrc ?? t.avatar_url ?? fallback.imgSrc,
      link: t.link ?? fallback.link ?? '',
      quote: t.quote,
      clientName: t.clientName ?? t.client_name,
      profession: t.profession,
      delay: t.delay ?? fallback.delay
    };
  });
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <CustomArrow className="slick-next" />,
    prevArrow: <CustomArrow className="slick-prev" />,
    responsive: [ // Optional: Add responsive breakpoints
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="container-fluid py-5 my-5" id="testimonial">
      <div className="container-fluid py-5">
        <h2
          className="display-5 text-center mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ color: 'WhiteSmoke' }}
        >
          Testimonial
        </h2>
        <div className="row justify-content-center">
          <div className="col-lg-3 d-none d-lg-block">
            <div className="testimonial-left h-100" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
              {testimonials.slice(0, Math.ceil(testimonials.length / 2)).map((testimonial) => (
                <a key={testimonial.id} href={testimonial.link} target="_blank" rel="noopener noreferrer">
                  <img
                    className="img-fluid wow fadeIn"
                    data-wow-delay={testimonial.delay}
                    src={testimonial.imgSrc}
                    style={imgStyle2}
                    alt={testimonial.clientName}
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <Slider {...sliderSettings} key={testimonials.length}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="testimonial-item text-center"
                  style={{ color: 'WhiteSmoke' }}
                >
                  <div className="position-relative mb-5">
                  <a key={testimonial.id} href={testimonial.link} target="_blank" rel="noopener noreferrer">
                    <img
                      className="img-fluid rounded-circle border border-secondary p-2 mx-auto"
                      src={testimonial.imgSrc}
                      style={imgStyle}
                      alt=""
                    />
                    </a>
                    <div className="testimonial-icon">
                      <FaQuoteLeft className="text-primary" />
                    </div>
                  </div>
                  <p className="fs-9 fst-italic"
                    style={{
                      color: 'WhiteSmoke', // Text color
                    }}
                  >{testimonial.quote}</p>
                  <hr className="w-25 mx-auto" />
                  <h5 style={{ color: '#c770f0' }}>{testimonial.clientName}</h5>
                  <span style={{ color: '#c770f0' }}>{testimonial.profession}</span>
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-lg-3 d-none d-lg-block">
            <div className="testimonial-right h-100" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
              {testimonials.slice(Math.ceil(testimonials.length / 2)).map((testimonial) => (
                <a key={testimonial.id} href={testimonial.link} target="_blank" rel="noopener noreferrer">
                  <img
                    className="img-fluid wow fadeIn"
                    data-wow-delay={testimonial.delay}
                    src={testimonial.imgSrc}
                    style={imgStyle2}
                    alt={testimonial.clientName}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Testimonials;
