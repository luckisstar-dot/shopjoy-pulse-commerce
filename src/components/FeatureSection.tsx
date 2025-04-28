
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Gift, Shield, Truck } from 'lucide-react';

const features = [
  {
    title: "Fast Delivery",
    description: "Get your orders delivered to your doorstep quickly and reliably, with real-time tracking.",
    icon: Truck,
    color: "bg-shopjoy-green",
  },
  {
    title: "Secure Payments",
    description: "Shop with confidence using our secure payment processing systems with encryption.",
    icon: Shield,
    color: "bg-shopjoy-purple-light",
  },
  {
    title: "24/7 Support",
    description: "Our customer service team is available around the clock to assist with any questions.",
    icon: Clock,
    color: "bg-shopjoy-yellow",
  },
  {
    title: "Easy Returns",
    description: "Not satisfied? Return products within 30 days for a full refund with our hassle-free policy.",
    icon: Gift,
    color: "bg-shopjoy-orange",
  },
];

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
  const Icon = feature.icon;
  
  return (
    <Card className="h-full shopjoy-card-hover border-none">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-2`}>
          <Icon className="h-6 w-6 text-foreground" />
        </div>
        <CardTitle>{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  );
};

const FeatureSection = () => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ShopJoy</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're dedicated to providing the best shopping experience for our customers and merchants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
