import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Calendar, MapPin, Users, Building2, Mail, Phone, User } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Try multiple API endpoints
  const API_ENDPOINTS = [
    'http://localhost/harit-bharat-expo/api/registrations',
    'http://jodhpur.theharitbharat.com/api/registrations',
    'https://jodhpur.theharitbharat.com/api/registrations'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Try each endpoint until one works
    let success = false;
    
    for (const baseUrl of API_ENDPOINTS) {
      try {
        console.log(`Trying endpoint: ${baseUrl}/registrations`);
        
        const response = await fetch(`${baseUrl}/registrations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          success = true;
          toast({
            title: "Registration Successful! 🎉",
            description: "Thank you for registering for Harit Bharat Expo. We'll send you event details via email.",
          });

          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
          });
          break;
        }
      } catch (error) {
        console.error(`Failed with ${baseUrl}:`, error);
        continue;
      }
    }

    if (!success) {
      toast({
        title: "Registration Error",
        description: "Unable to connect to the server. Please try again later or contact support.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-50 via-green-50/80 to-yellow-50/50 border-b-2 border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Harit Bharat Expo Logo" 
                className="w-14 h-14 object-contain"
              />
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">Harit Bharat Expo</h1>
                <p className="text-sm text-green-700 font-medium">India's Premier Renewable Energy Platform</p>
              </div>
            </div>
            
            {/* Event Details */}
            <div className="flex gap-6 flex-wrap justify-center">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/60 backdrop-blur rounded-lg border border-green-200/50 shadow-sm hover:shadow-md transition-shadow">
                <Calendar className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="text-xs text-green-600 font-semibold uppercase">Dates</p>
                  <p className="text-sm font-bold text-foreground">Nov 21-23, 2024</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-3 bg-white/60 backdrop-blur rounded-lg border border-green-200/50 shadow-sm hover:shadow-md transition-shadow">
                <MapPin className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="text-xs text-green-600 font-semibold uppercase">Venue</p>
                  <p className="text-sm font-bold text-foreground">Jodhpur, Rajasthan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Registration Form */}
          <Card className="max-w-2xl mx-auto shadow-xl border-primary/20">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">Visitor Registration</CardTitle>
              <CardDescription className="text-base">
                Register now to secure your spot at the expo. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    required
                    className="border-input focus:border-primary"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="border-input focus:border-primary"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className="border-input focus:border-primary"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  size="lg"
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Submitting..." : "Complete Registration"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By registering, you agree to receive event updates and communications about Harit Bharat Expo.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Event Details Section */}
          <div className="mt-16 px-4 py-12 bg-gradient-to-b from-green-50/40 to-transparent rounded-2xl border border-green-100/50">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full text-sm font-medium text-green-700 mb-4">
                <Leaf className="w-4 h-4" />
                Renewable Energy Expo
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-foreground leading-tight">
                Join India's Largest<br />
                <span className="bg-gradient-to-r from-green-600 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                  Solar & Clean Energy Event
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with industry leaders, explore cutting-edge technologies, and be part of the sustainable energy transformation.
              </p>
            </div>

            {/* Event Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur border border-green-100/50 rounded-xl shadow-sm hover:shadow-md transition-all">
                <Calendar className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="font-semibold text-foreground mb-2 text-lg">Event Dates</h3>
                <p className="text-muted-foreground">November 21-23, 2024</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur border border-green-100/50 rounded-xl shadow-sm hover:shadow-md transition-all">
                <MapPin className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="font-semibold text-foreground mb-2 text-lg">Venue</h3>
                <p className="text-muted-foreground">Jodhpur, Rajasthan</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur border border-green-100/50 rounded-xl shadow-sm hover:shadow-md transition-all">
                <Users className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="font-semibold text-foreground mb-2 text-lg">Expected</h3>
                <p className="text-muted-foreground">35,000+ Visitors</p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">500+</p>
                  <p className="text-xs">Exhibitors</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">150+</p>
                  <p className="text-xs">Speakers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">100+</p>
                  <p className="text-xs">Sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
