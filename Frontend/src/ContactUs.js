import "./ContactCss.css";

const contactInfo = {
  phone: "+95 9 000 000 000", // Replace with your primary line
  whatsapp: "+95 9 000 000 000", // Replace if you use Viber/WhatsApp
  email: "hello@aungmyaytreasure.com", // Replace with your inbox
  address: "Yangon showroom – update full address here",
};

function ContactUs() {
  return (
    <div className="container">
      <div className="contact-details">
        <h3>Visit or call us</h3>
        <p>Phone: {contactInfo.phone}</p>
        <p>WhatsApp / Viber: {contactInfo.whatsapp}</p>
        <p>Email: {contactInfo.email}</p>
        <p>Address: {contactInfo.address}</p>
        <p className="note">Walk-ins welcome. For reservations, send us the piece name and preferred pick-up date.</p>
      </div>

      <form action="https://formspree.io/f/mpzbnday" id="contact" method="POST">
        <h3>Send a message</h3>
        <h4>We usually reply within one business day.</h4>
        <fieldset>
          <input placeholder="Name" type="text" tabIndex="1" required />
        </fieldset>
        <fieldset>
          <input placeholder="Email" type="email" tabIndex="2" name="email" required />
        </fieldset>
        <fieldset>
          <input placeholder="Phone (optional)" type="tel" tabIndex="3" name="phone" />
        </fieldset>
        <fieldset>
          <textarea
            placeholder="What would you like to see or reserve?"
            tabIndex="4"
            name="message"
            required
          ></textarea>
        </fieldset>
        <fieldset>
          <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
            Send request
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ContactUs;