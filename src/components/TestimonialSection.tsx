
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frequent Shopper",
    image: "https://i.pravatar.cc/150?img=32",
    content: "ShopJoy has completely changed how I shop online. The interface is intuitive, and I can find exactly what I need in seconds. Plus, the product recommendations are spot-on!",
  },
  {
    name: "Michael Chen",
    role: "Store Owner",
    image: "https://i.pravatar.cc/150?img=69",
    content: "As a small business owner, the management tools ShopJoy provides have been a game-changer. I've increased my sales by 30% and saved countless hours on inventory management.",
  },
  {
    name: "Emma Rodriguez",
    role: "Fashion Blogger",
    image: "https://i.pravatar.cc/150?img=5",
    content: "I recommend ShopJoy to all my followers. The product presentation is beautiful, checkout is seamless, and I love how easy it is to share my favorite finds directly to my social platforms.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <Card className="h-full shopjoy-card-hover">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <svg className="h-8 w-8 text-shopjoy-purple opacity-70" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064c3.36 0 5.856-2.688 5.856-5.856c0-3.168-2.208-5.472-5.088-5.472c-.576 0-1.344.096-1.536.192c.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36c0 5.088 3.072 8.064 6.624 8.064c3.264 0 5.856-2.688 5.856-5.856c0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192c.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>
        <p className="text-foreground flex-grow">{testimonial.content}</p>
        <div className="flex items-center mt-6">
          <Avatar className="h-10 w-10 border-2 border-shopjoy-purple">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium text-sm">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialSection = () => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our happy customers and store owners about their experience with ShopJoy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
