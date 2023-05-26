import CommonSection from "../shared/CommonSection";
import { Container,Row,Col } from "reactstrap";
import Subtitle from '../shared/Subtitle';
import MasonryImagesGallery from "../components/image-gallery/MasonryImagesGallery";

const Gallery = ()=>{
    window.scrollTo(0,0)
    return(
        <>
         <CommonSection title={"Gallery"}/>
         <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <Subtitle subtitle={'Gallery'}/>
                    <h2 className="gallery__title">
                        Visit our customers tour gallery
                    </h2>
                </Col>
                <Col lg='12'>
                <MasonryImagesGallery />
                </Col>
            </Row>
        </Container>
    </section>
        </>
    )
}

export default Gallery;