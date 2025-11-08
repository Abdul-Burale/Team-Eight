import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2">Contact Us</h1>
        <p className="text-gray-600">We're here to help you find your perfect home</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Methods */}
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2">Phone</h3>
            <p className="text-gray-600 mb-2">Mon-Fri: 9am - 6pm</p>
            <p className="text-blue-600">1-800-HOMEMATCH</p>
            <p className="text-sm text-gray-500">(1-800-466-3628)</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2">Email</h3>
            <p className="text-gray-600 mb-2">24/7 support</p>
            <p className="text-green-600">support@homematch.com</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Get instant help</p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Smith" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@email.com" />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" />
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="property">Property Question</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="account">Account Issue</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                rows={6}
              />
            </div>
            
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>
        
        {/* Info & FAQs */}
        <div className="space-y-6">
          {/* Office Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Office Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="mb-1">Headquarters</h4>
                <p className="text-sm text-gray-600">
                  123 Main Street<br />
                  San Francisco, CA 94102<br />
                  United States
                </p>
              </div>
              
              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="mb-1">East Coast Office</h4>
                <p className="text-sm text-gray-600">
                  456 Broadway Avenue<br />
                  New York, NY 10013<br />
                  United States
                </p>
              </div>
              
              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="mb-1">Support Center</h4>
                <p className="text-sm text-gray-600">
                  789 Tech Drive<br />
                  Austin, TX 78701<br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * Email and chat support available 24/7
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* FAQs */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does HomeMatch work?</AccordionTrigger>
              <AccordionContent>
                HomeMatch uses advanced AI algorithms to match you with properties that fit your lifestyle, 
                preferences, and budget. Simply describe your ideal home, set your preferences, and we'll 
                provide personalized recommendations with detailed insights on commute times, neighborhood 
                vibes, and investment potential.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Is HomeMatch free to use?</AccordionTrigger>
              <AccordionContent>
                Yes! Creating an account, searching for properties, and setting up alerts is completely free. 
                We partner with real estate agents and property owners who pay us when you successfully rent 
                or purchase through our platform.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How accurate are the price forecasts?</AccordionTrigger>
              <AccordionContent>
                Our price forecasts are based on historical data, market trends, and machine learning models. 
                While we strive for accuracy, real estate markets can be unpredictable. We recommend using our 
                forecasts as one of many tools in your decision-making process.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I schedule property viewings through HomeMatch?</AccordionTrigger>
              <AccordionContent>
                Yes! You can schedule viewings directly through our platform. Simply click "Schedule a Tour" 
                on any property listing, and we'll coordinate with the property agent or owner to arrange a 
                convenient time for you.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>What areas does HomeMatch cover?</AccordionTrigger>
              <AccordionContent>
                HomeMatch currently operates in major metropolitan areas across the United States, with plans 
                to expand internationally. Check our search page to see if your desired location is available.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>How do I make an offer on a property?</AccordionTrigger>
              <AccordionContent>
                Once you find a property you love, click "Make an Offer" on the property details page. You'll 
                be guided through our streamlined offer process, which includes connecting with legal 
                professionals and completing necessary paperwork.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
