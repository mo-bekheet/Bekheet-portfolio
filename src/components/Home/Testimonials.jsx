import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)'
  }
};

const CustomArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block'}}
    onClick={onClick}
  />
);

const Testimonials = () => {
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

  const testimonials = [
    {
      id: 1,
      imgSrc: '/Testimonial/img1.jpeg',
      link: 'https://www.linkedin.com/in/mahmoud-yahia-%F0%9F%87%B5%F0%9F%87%B8-4a98a2156/', 
      quote:
        "Mohamed possesses a rare combination of technical prowess, creativity, and dedication that sets him apart in his field. His deep understanding of machine learning algorithms and techniques has been instrumental in tackling complex challenges and delivering innovative solutions. Whether it's developing predictive models, optimizing algorithms, or integrating AI technologies into our systems, Mohamed consistently demonstrates a remarkable level of expertise and proficiency.",
      clientName: 'Mahmoud Yahia',
      profession: 'Machine Learning Engineer',
      delay: 0.3,
    },
    {
      id: 2,
      imgSrc: '/Testimonial/img2.jpeg',
      link: 'https://www.linkedin.com/in/kirolos-ataallah-631755123/', 
      quote:
        " worked with bekhet while studying for a master's degree in ottawa university. Bekhet is a hard worker and always have intelligent solutions for the problems. ",
      clientName: 'Kirolos A Ataallah',
      profession: 'Computer Vision Researcher at VisionCAIR Lab at KAUST university',
      delay: 0.5,
    },
    {
      id: 3,
      imgSrc: '/Testimonial/img3.jpeg',
      link: 'https://www.linkedin.com/in/mahmoud--saeed/',
      quote:
        "I have had the pleasure of working closely with Mohammed Bekhet during our time together at Ain Shams University. As fellow students pursuing degrees in Software Engineering and AI, Mohammed consistently impressed me with his dedication, intelligence, and passion for the field. Mohammed possesses a remarkable ability to grasp complex concepts quickly and apply them effectively in practical scenarios. Whether it was tackling challenging coding assignments or delving into advanced AI algorithms, he demonstrated a strong aptitude for problem-solving and critical thinking. What truly sets Mohammed apart is his collaborative spirit and natural leadership qualities. He not only contributed valuable insights to our group projects but also fostered a positive and supportive team environment. His willingness to help others, share knowledge, and take initiative greatly enriched our learning experience. Moreover, Mohammed exhibits a strong work ethic and a genuine enthusiasm for staying abreast of the latest advancements in technology. He eagerly took on extracurricular projects and sought out opportunities to expand his skill set, demonstrating a proactive approach to personal and professional growth. I have no doubt that Mohammed Bekhet will excel in any endeavor he pursues in the field of Software Engineering and AI. He would be a valuable asset to any team or organization, and I wholeheartedly recommend him for any opportunity that comes his way",
      clientName: 'Mahmoud Saeed',
      profession: 'Software Engineer | Flutter Developer',
      delay: 0.7,
    },
    {
      id: 4,
      imgSrc: '/Testimonial/img4.jfif',
      link: 'https://www.linkedin.com/in/mohamed-adel-aboeldahab/', // Add link property
      quote:
        "Working with Mohamed has been an exceptional experience. He combines profound technical skills with innovative thinking, setting him apart in the realm of machine learning. His proficiency in analyzing intricate data sets, developing advanced algorithms, and constructing robust models is nothing short of remarkable. Beyond his technical prowess, Mohamed is an outstanding communicator and collaborator. He actively engages with feedback and works harmoniously with colleagues to reach shared objectives. His positive demeanor and readiness to assist whenever necessary have made him a crucial asset to our team. I wholeheartedly recommend Mohamed to anyone seeking a highly skilled and reliable machine learning professional.",
      clientName: 'mohamed adel',
      profession: 'Full-Stack Dot net Developer',
      delay: 0.9,
    },
    {
      id: 5,
      imgSrc: '/Testimonial/img5.jpeg',
      link: 'https://www.linkedin.com/in/eslamelassal/',
      quote:
        "I am excited to recommend Mohamed Bekheet, with whom I had the pleasure of working on several projects during our master’s program. From the outset, he demonstrated exceptional dedication and professionalism. Mohamed played a crucial role in our projects, bringing not only his technical skills but also a collaborative spirit that made our team stronger. His expertise in Natural Language Processing (NLP) was invaluable, allowing us to tackle complex challenges with innovative solutions. One of the standout moments was when Mohamed led the development of a project that involved analyzing sentiment in social media data. He took the initiative to implement advanced NLP techniques, resulting in significant improvements in our model's accuracy and performance. In addition to his technical expertise, Mohamed is a fantastic problem solver. He has a remarkable ability to analyze complex problems and propose effective solutions, often thinking outside the box. His contributions not only helped us achieve our goals but also inspired the entire team to push our limits. Moreover, Mohamed is an exceptional team player. He is always willing to share his knowledge and support others, creating an inclusive and motivating environment. I wholeheartedly recommend Mohamed Bekheet for any future endeavors. I am confident that he will continue to excel and make a positive impact in any team.",
      clientName: 'Eslam Elassal',
      profession: 'Business Intelligence | Big Data | Data Engineer | CDMP | AWS 2x Certified | Microsoft 1x | Denodo 1x',
      delay: 1.1,
    },
    {
      id: 6,
      imgSrc: '/Testimonial/img6.jpg',
      link: 'https://www.linkedin.com/in/eslamelassal/',
      quote:
        "I enjoyed working with Bekheet during my master’s degree and in a professional setting while working in Forte Cloud. He is deeply dedicated to his work, sometimes to a fault, and consistently strives to think outside the box, bringing creative ideas that drive progress. What truly sets him apart is his unwavering passion for gaining knowledge and continuously improving himself.",
      clientName: 'Mohamed Elesawy',
      profession: 'Machine Learning Engineer @ FORTE CLOUD | Machine Learning',
      delay: 1.1,
    },
    
  ];
 
  return (
    <div className="container-fluid py-5 my-5" id="testimonial">
      <div className="container-fluid py-5">
        <h1
          className="display-5 text-center mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ color: 'WhiteSmoke' }}
        >
          Testimonial
        </h1>
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
            <Slider {...sliderSettings}>
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
