import CommonSection from "../shared/CommonSection";
import ServiceList from "../services/ServiceList";
import { Container,Row,Col } from "reactstrap";
import Subtitle from "../shared/Subtitle";
import experienceImg from "../assets/images/experience.png"
const About =()=>{
return(
    <>
      <CommonSection title={"About Us"}/>
        <section>
            <Container>
                <Row >
                <Col lg='3'>
                    <h5 className="services__subtitle">What we serve</h5>
                    <h2 className="services__title">We offer our best services</h2>
                    
                </Col>
                <ServiceList/>
                </Row>
            </Container>
        </section>

        <section>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="experience__content">
                        <Subtitle subtitle={'Experience'} />

                        <h2>With our all experience <br /> we will serve you</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            <br /> 
                            Quam aut ducimus earum modi expedita error consec.
                        </p>
                    </div>

                    <div className="counter__wrapper d-flex align-items-center gap-5">
                        <div className="counter__box">
                            <span>12k+</span>
                            <h6>Successfull trip</h6>
                        </div>
                        <div className="counter__box">
                            <span>2k+</span>
                            <h6>Regular Clients</h6>
                        </div>
                        <div className="counter__box">
                            <span>15</span>
                            <h6>Years experience</h6>
                        </div>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="experience__img">
                        <img src={experienceImg} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
     
    </>
)
}

export default About;