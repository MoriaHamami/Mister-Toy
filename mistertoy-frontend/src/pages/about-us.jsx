import { GoogleMap } from "../cmps/google-map"

export function AboutUs() {
    return <section className="about main-layout full">
        <h2>About Us</h2>
        <p>Welcome to our toy website, where playtime never ends! We are excited to bring you a wide selection of quality toys that will provide hours of entertainment and stimulate your child's imagination. Whether your child loves classic wooden toys, the latest electronic gadgets or action figures, we have something for everyone. Our website features a simple and user-friendly interface, making it easy to browse through all our products and find just what you're looking for. We understand that children have different interests and needs, so we've categorised our toys based on age, gender and type, enabling you to find the perfect toy quickly and easily. Our website is updated regularly, ensuring that you'll find new and exciting toys every time you visit. Shop with us today and let your child's imagination soar!</p>
        <h2>Our Stores</h2>
        <GoogleMap />
    </section>

}
