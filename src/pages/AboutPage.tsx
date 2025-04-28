
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About ShopJoy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Making shopping joyful for customers and merchants alike since 2023.
            </p>
          </div>
        </section>
        
        {/* Mission Statement */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At ShopJoy, we believe shopping should be a delightful experience for everyone. Our mission is to create 
                  a platform that brings joy to both shoppers and store owners by providing intuitive tools and exceptional experiences.
                </p>
                <p className="text-muted-foreground">
                  We're committed to making e-commerce accessible, effective, and enjoyable for businesses of all sizes,
                  while ensuring shoppers find exactly what they're looking for with minimal friction.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80" 
                    alt="ShopJoy team" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-shopjoy-purple-light -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-shopjoy-yellow -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-16 bg-muted">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-shopjoy-green flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Customer Joy</h3>
                <p className="text-muted-foreground">
                  We measure our success by the joy and satisfaction of our customers, both shoppers and merchants.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-shopjoy-yellow flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly innovate to create better shopping and management experiences.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-shopjoy-orange flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We design our platform to be accessible and usable for everyone, regardless of technical ability.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-shopjoy-purple-light flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Integrity</h3>
                <p className="text-muted-foreground">
                  We operate with transparency and honesty in all of our business practices.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-16">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-12">
              Our diverse team of experts is passionate about creating the best shopping experience possible.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="aspect-square w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://i.pravatar.cc/300?img=11" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                <p className="text-muted-foreground">CEO & Founder</p>
              </div>
              <div className="text-center">
                <div className="aspect-square w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://i.pravatar.cc/300?img=3" 
                    alt="Michael Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">Michael Chen</h3>
                <p className="text-muted-foreground">CTO</p>
              </div>
              <div className="text-center">
                <div className="aspect-square w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://i.pravatar.cc/300?img=9" 
                    alt="Alicia Rodriguez" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">Alicia Rodriguez</h3>
                <p className="text-muted-foreground">Head of Design</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-shopjoy-purple text-white py-16">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience ShopJoy?</h2>
            <p className="max-w-2xl mx-auto mb-8 opacity-90">
              Join thousands of satisfied customers and merchants who have made ShopJoy their platform of choice.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-shopjoy-purple">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
