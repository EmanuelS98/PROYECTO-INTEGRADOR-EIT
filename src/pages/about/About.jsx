import "./about.scss";
import Mission from "./mission/Mission";
import Values from "./values/Values";
import Vision from "./vision/Vision";

const About = () => {
    return (
        <div className="about">
            <div className="about__container">
                <Mission/>
                <Vision/>
                <Values/>
            </div>
        </div>
    );
};

export default About;