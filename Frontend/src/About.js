import "./AboutUs.css";

function About() {
    return (
        <div>
            <section className="about-section">
                <div className="container">
                    <div className="row">
                        <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                            <div className="inner-column">
                                <div className="sec-title">
                                    <span className="title">About Aung Myay Treasure</span>
                                    <h2>Craftsmanship, trust, and Myanmar heritage</h2>
                                </div>
                                <div className="text">
                                    We are a family-run jeweller connecting Myanmar's finest goldsmiths and
                                    gem setters with customers who value authenticity. Every ring, bracelet,
                                    and necklace is inspected in-house to guarantee purity and lasting shine.
                                </div>
                                <ul className="list-style-one">
                                    <li>24K and 22K gold crafted locally</li>
                                    <li>GIA-certified diamonds and gemstone pieces</li>
                                    <li>Personal consultations - no online checkout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
