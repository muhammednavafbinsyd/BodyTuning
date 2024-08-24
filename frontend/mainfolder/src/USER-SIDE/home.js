import React, { useEffect, useState } from "react";
import "../assets/usercss/style.css";
import Navbar from "./Navbar";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Footer from "./footer";
import ser2 from "../assets/img/services/service-pic.jpg";
import ser3 from "../assets/img/services/service-icon-1.png";
import ser4 from "../assets/img/services/service-icon-3.png";
import ser5 from "../assets/img/services/service-icon-4.png";
import ser6 from "../assets/img/services/service-icon-2.png";
import register from "../assets/img/register-pic.jpg";
import aboutpic1 from "../assets/img/play.png";
import aboutpic2 from "../assets/img/about-pic.jpg";
import testi2 from "../assets/img/testimonial/quote-left.png";
import bannerimage2 from "../assets/img/banner-bg.jpg";
import personimage from "../assets/img/banner-person.png";
import bannerimage from "../assets/img/hero-bg.jpg";
import axios from "axios";
function Home() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [heightValue, setHeightValue] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [bmiValue, setBmiValue] = useState("");
  const [bmiMessage, setBmiMessage] = useState("");
  // services
  const [list, setList] = useState([]);
  // status
  const [listStatus, setListStatus] = useState([]);
  // Testimonials
  const [listTestimonials, setListTestimonials] = useState([]);
  // Membership
  const [membershiplist, setMembershiplist] = useState([]);
  // Registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [error7, setError7] = useState("");
  const [error8, setError8] = useState("");
  const Registration = () => {
    const validationErrors = [];
    if (!name) {
      setError1("Name is required");
      validationErrors.push("Please enter name");
    } else {
      setError1(null);
    }
    if (!email) {
      setError2("Email is required");
      validationErrors.push("Please enter email");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError2("Email is not valid");
      validationErrors.push("please enter a valid email");
    } else {
      setError2("");
    }
    if (!phonenumber) {
      setError3("Contact is required");
    } else if (!/^\d{10}$/.test(phonenumber)) {
      setError3("Contact is not valid");
      validationErrors.push("please enter a valid contact");
    } else {
      setError3(null);
    }
    if (!password) {
      setError4("Password is required");
      validationErrors.push("Password is required");
    } else if (password.length < 6) {
      setError4("Password must be at least 6 characters");
      validationErrors.push("Password must be at least 6 characters");
    } else {
      setError4(null);
    }
    if (!location) {
      setError5("Location is required");
      validationErrors.push("Location must be");
    } else {
      setError5(null);
    }
    if (!city) {
      setError6("City is required");
      validationErrors.push("City is required");
    } else {
      setError6(null);
    }
    if (!pin) {
      setError7("Pin is required");
      validationErrors.push("Pin is required");
    } else {
      setError7(null);
    }
    if (!country) {
      setError8("Country is required");
      validationErrors.push("Country is required");
    } else {
      setError8(null);
    }
    if (validationErrors.length === 0) {
      const fromdata = {
        username: name,
        email: email,
        phonenumber: phonenumber,
        password: password,
        location: location,
        city: city,
        pin: pin,
        country: country,
      };
      axios
        .post(`${BaseUrl}/adminroute/registration`, fromdata)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
          alert("failedToRegister");
        });
    }
  };
  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/userroute/services`);
        setList(response.data);
      } catch (err) {
        console.log(err, "An error occurred");
      }
    };
    const getstatus = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/userroute/statusOnly`);
        setListStatus(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const TestimonialsGet = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/userroute/testimonialList`);
        setListTestimonials(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const membership = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/userroute/membership`);
        setMembershiplist(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getServices();
    getstatus();
    TestimonialsGet();
    membership();
  }, []);
  const Calculate = () => {
    if (heightValue && weightValue) {
      const heightInMeters = heightValue / 100;
      const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
      setBmiValue(bmi);
      let message = "";
      if (bmi < 18.5) {
        message = "You are Underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        message = "You are Normal weight";
      } else if (bmi >= 25 && bmi < 30) {
        message = "You are Overweight";
      } else {
        message = "You are Obese";
      }
      setBmiMessage(message);
    } else {
      setBmiValue("");
      setBmiMessage("");
    }
  };
  const [open, setopen] = useState(false);
  const [hide, sethide] = useState(true);
  function handleclick() {
    setopen(true);
    sethide(false);
  }
  return (
    <div>
      <Navbar />
      {/* Header End */}
      {/* Hero Section Begin */}
      <section className="hero-section set-bg" style={{ backgroundImage: `url(${bannerimage})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-text">
                <span>Check your bmi</span>
                <h1>BMI CALCULATOR</h1>

                <SoftBox className="your_bmi">
                  <SoftInput
                    className="bmi_input"
                    type="tel"
                    placeholder="Enter your height(cm)"
                    value={heightValue}
                    onChange={(e) => setHeightValue(e.target.value)}
                  ></SoftInput>
                  <SoftInput
                    className="bmi_input"
                    type="tel"
                    placeholder="Enter your weight(kg)"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                  ></SoftInput>
                  <SoftButton className="primary-btn" onClick={Calculate}>
                    Calculate
                  </SoftButton>
                  {bmiValue && bmiMessage && (
                    <SoftBox className="result">
                      <p>
                        Your BMI: <span className="bmi-value">{bmiValue}</span>
                      </p>
                      <p>
                        Result: <span className="bmi-message">{bmiMessage}</span>
                      </p>
                    </SoftBox>
                  )}
                </SoftBox>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}
      {/* About Section Begin */}
      <section className="about-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-pic">
                <img src={aboutpic2} alt />
                <a
                  href="https://www.youtube.com/watch?v=SlPhMPnQ58k"
                  className="play-btn video-popup"
                >
                  <img src={aboutpic1} alt />
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h2>Story About Us</h2>
                <p className="first-para">
                  Fitness encompasses the state of being physically active, healthy, and capable of
                  performing various physical tasks. It involves a combination of exercise,
                  nutrition, rest, and overall lifestyle choices aimed at improving and maintaining
                  ones well-being. Achieving fitness involves cardiovascular endurance, muscular
                  strength, flexibility, and body composition.
                </p>
                {open && (
                  <p className="second-para">
                    Regular exercise routines, balanced diets, adequate sleep, and a commitment to a
                    healthy lifestyle are key components in attaining and sustaining physical
                    fitness. Fitness not only benefits the body but also plays a crucial role in
                    mental health, boosting mood, reducing stress, and enhancing overall quality of
                    life.
                  </p>
                )}
                {hide && (
                  <a href="#" className="primary-btn" onClick={handleclick}>
                    Read More
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section End */}
      {/* Services Section Begin */}
      <section className="services-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="services-pic">
                <img src={ser2} alt />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="service-items">
                <div className="row">
                  <div className="col-md-6">
                    <div className="services-item bg-gray">
                      <img src={ser3} alt />
                      <h4>Strategies</h4>
                      <p>
                        Strategies are comprehensive plans or methods devised to achieve specific
                        goals or objectives.
                      </p>
                    </div>
                    <div className="services-item bg-gray pd-b">
                      <img src={ser4} alt />
                      <h4>Workout</h4>
                      <p>
                        A workout refers to a structured physical activity or exercise routine
                        designed to improve fitness, strength, endurance, flexibility, or overall
                        health.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="services-item">
                      <img src={ser6} alt />
                      <h4>Yoga</h4>
                      <p>
                        Yoga is a transformative practice that extends beyond physical exercise.
                      </p>
                    </div>
                    <div className="services-item pd-b">
                      <img src={ser5} alt />
                      <h4>Weight Loss</h4>
                      <p>
                        Weight loss refers to the reduction of body mass, typically achieved by a
                        combination of dietary changes, increased physical activity, and lifestyle
                        modifications
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section End */}
      {/* Classes Section Begin */}
      <section className="classes-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2 style={{ color: "lavender" }}>UNLIMITED CLASSES</h2>
              </div>
            </div>
          </div>
          <div className="row classes-slider owl-carousel">
            {list.map((item, index) => (
              <div key={index} className="col-lg-4">
                <div
                  className="single-class-item set-bg"
                  style={{ backgroundImage: `url(${BaseUrl}/uploads/${item.image})` }}
                >
                  <div className="si-text">
                    <h4>{item.title}</h4>
                    <span>{item.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Classes Section End */}
      {/* Trainer Section Begin */}
      <section className="trainer-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>EXPERT TRAINERS</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {listStatus.map((item) => (
              <div className="col-lg-4 col-md-6" key={item._id}>
                <div className="single-trainer-item">
                  <img
                    style={{ height: "41rem" }}
                    src={`${BaseUrl}/${item.image[1]}`}
                    alt
                  />

                  <div className="trainer-text">
                    <h5>
                      {item.firstname},{item.lastname}
                    </h5>
                    <span>{item.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Trainer Section End */}
      {/* Testimonial Section Begin */}
      <section className="testimonial-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2 style={{ color: "lavender" }}>success stories</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {listTestimonials.map((item) => (
              <div className="col-lg-10 offset-lg-1" key={item}>
                <div className="testimonial-slider owl-carousel">
                  <div className="testimonial-item">
                    <p style={{ color: "grey" }}>
                      {item.description}                 
                    </p>
                    <div className="ti-pic">
                      <img src={`${BaseUrl}/uploads/${item.image}`} alt />
                      <div className="quote">
                        <img src={testi2} alt />
                      </div>
                    </div>
                    <div className="ti-author">
                      <h4 style={{ color: "white" }}>{item.title}</h4>
                      <span>Leader</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonial Section End */}
      {/* Banner Section Begin */}
      <section
        className="banner-section set-bg"
        style={{ backgroundImage: `url(${bannerimage2})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-text">
                {/* <h2>Get training today</h2> */}
                <h2>Welcome to Body Tuning!</h2>
                <p>
                  At Body Tuning, we are dedicated to revolutionizing the way you perceive fitness
                  and wellness. Our mission is to provide tailored programs and expert guidance that
                  empower individuals to achieve their health goals.
                </p>
                <p>
                  With a team of experienced professionals, we offer personalized training regimes,
                  nutritional guidance, and holistic approaches to optimize your bodys potential. We
                  understand that every individual is unique, and our focus is on crafting
                  personalized plans that suit your specific needs and aspirations.
                </p>
                <p>
                  Contact us today to embark on a transformative journey towards a healthier, more
                  vibrant you!
                </p>
                <a href="/contact" className="primary-btn banner-btn">
                  Contact Now
                </a>
              </div>
            </div>
            <div className="col-lg-5">
              <img src={personimage} alt />
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section End */}
      {/* Membership Section Begin */}
      <section className="membership-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2 style={{ color: "white" }}>MEMBERSHIP PLANS</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {membershiplist.slice(0, 3).map((item) => (
              <div className="col-lg-4" key={item}>
                <div className="membership-item">
                  <div className="mi-title">
                    <h4>{item.membershiptype}</h4>
                    <div className="triangle" />
                  </div>
                  <h2 className="mi-price">
                    {item.monthlyfee}
                    <span>{item.duration}</span>
                  </h2>
                  <ul>
                    <li>
                      <p>Registration fee</p>
                      <span>{item.onetimeentrollmentfee}</span>
                    </li>
                    <li>
                      <p>Additonal benefits</p>
                      <span>{item.additionalbenefits}</span>
                    </li>
                  </ul>
                  <a href="#" className="primary-btn membership-btn">
                    Start Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Membership Section End */}
      {/* Register Section Begin */}
      <section className="register-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="register-text">
                <div className="section-title">
                  <h2>Register Now</h2>
                  <p>The First 7 Day Trial Is Completely Free With The Teacher</p>
                </div>
                <form action="#" className="register-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="name">Name</label>
                      <input
                        required
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p style={{ color: "red" }}>{error1}</p>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="email">Your email address</label>
                      <input
                        required
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p style={{ color: "red" }}>{error2}</p>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="last-name">contact</label>
                      <input
                        required
                        type="Number"
                        id="number"
                        onChange={(e) => setPhonenumber(e.target.value)}
                      />
                      <p style={{ color: "red" }}>{error3}</p>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="mobile">Password</label>
                      <input
                        required
                        type="text"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <p style={{ color: "red" }}> {error4}</p>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="mobile">Location</label>
                      <input
                        required
                        type="text"
                        id="Location"
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <p style={{ color: "red" }}>{error5}</p>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="mobile">City</label>
                      <input
                        required
                        type="text"
                        id="City"
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <p style={{ color: "red" }}>{error6}</p>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="mobile">Pin</label>
                      <input
                        required
                        type="Number"
                        id="Pin"
                        onChange={(e) => setPin(e.target.value)}
                      />
                      <p style={{ color: "red" }}>{error7}</p>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="mobile">Country</label>
                      <input
                        required
                        type="text"
                        id="Country"
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <p style={{ color: "red" }}>{error8}</p>
                    </div>
                  </div>
                  <button type="submit" className="register-btn" onClick={Registration}>
                    Get Started
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="register-pic">
                <img src={register} alt />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Register Section End */}
      {/* Latest Blog Section Begin */}
      <Footer />
    </div>
  );
}
export default Home;
