import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Home, Target, Users, Award, Shield, FileText } from 'lucide-react';

export function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="cookies">Cookies</TabsTrigger>
        </TabsList>
        
        {/* About Us */}
        <TabsContent value="about" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="mb-4">About HomeMatch</h1>
            <p className="text-gray-600 text-lg">
              We're revolutionizing the way people find their perfect home through 
              intelligent matching and personalized insights.
            </p>
          </div>
          
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="mb-3">Our Mission</h2>
                <p className="text-gray-600">
                  To simplify the home search process by leveraging AI and data-driven insights, 
                  helping people make informed decisions about one of life's biggest investments.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="mb-3">Our Vision</h2>
                <p className="text-gray-600">
                  To become the world's most trusted platform for property discovery, 
                  where every person finds not just a house, but a home that truly fits their life.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Story */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  HomeMatch was founded in 2020 by a team of real estate professionals and 
                  technologists who experienced firsthand the challenges of finding the perfect home. 
                  Traditional property search was time-consuming, overwhelming, and often resulted in 
                  compromises that buyers and renters regretted.
                </p>
                <p>
                  We asked ourselves: "What if technology could understand not just what you're looking 
                  for in a property, but how you live your life?" This question led to the development 
                  of our proprietary AI matching algorithm that considers everything from commute times 
                  to neighborhood vibes, school ratings to investment potential.
                </p>
                <p>
                  Today, HomeMatch has helped over 50,000 people find their perfect homes across the 
                  United States. Our platform continues to evolve, incorporating user feedback and 
                  the latest technology to make home search smarter, faster, and more personalized.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Values */}
          <div className="mb-12">
            <h2 className="text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2">User-Centric</h3>
                  <p className="text-sm text-gray-600">
                    Every decision we make starts with the question: "How does this help our users?"
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2">Transparency</h3>
                  <p className="text-sm text-gray-600">
                    We believe in honest, transparent communication about properties, prices, and processes.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="mb-2">Innovation</h3>
                  <p className="text-sm text-gray-600">
                    We continuously push boundaries to create better solutions for home seekers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Team */}
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-6 text-center">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl">
                    SA
                  </div>
                  <h4>Sarah Anderson</h4>
                  <p className="text-sm text-gray-600">CEO & Co-Founder</p>
                  <p className="text-xs text-gray-500 mt-2">Former VP at Zillow</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl">
                    MC
                  </div>
                  <h4>Michael Chen</h4>
                  <p className="text-sm text-gray-600">CTO & Co-Founder</p>
                  <p className="text-xs text-gray-500 mt-2">Ex-Google AI Lead</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl">
                    EP
                  </div>
                  <h4>Emily Porter</h4>
                  <p className="text-sm text-gray-600">Head of Product</p>
                  <p className="text-xs text-gray-500 mt-2">Previously at Airbnb</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Terms of Use */}
        <TabsContent value="terms">
          <Card>
            <CardContent className="p-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-8 w-8 text-blue-600" />
                <h1>Terms of Use</h1>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">Last Updated: November 6, 2025</p>
              
              <div className="space-y-6 text-gray-600">
                <section>
                  <h3 className="mb-3">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using HomeMatch, you accept and agree to be bound by the terms and 
                    provision of this agreement. If you do not agree to abide by the above, please do not 
                    use this service.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">2. Use of Service</h3>
                  <p className="mb-2">
                    HomeMatch provides a platform for property search and discovery. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide accurate and complete information when creating an account</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Not use the service for any illegal or unauthorized purpose</li>
                    <li>Not interfere with or disrupt the service or servers</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">3. Property Listings</h3>
                  <p>
                    All property listings are provided by third-party property owners, agents, or listing 
                    services. While we strive to ensure accuracy, HomeMatch does not guarantee the accuracy, 
                    completeness, or reliability of any property information.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">4. User Content</h3>
                  <p>
                    You retain all rights to any content you submit, post, or display on HomeMatch. By 
                    submitting content, you grant HomeMatch a worldwide, non-exclusive, royalty-free license 
                    to use, reproduce, and display such content in connection with the service.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">5. Limitation of Liability</h3>
                  <p>
                    HomeMatch shall not be liable for any indirect, incidental, special, consequential, or 
                    punitive damages resulting from your use of or inability to use the service. This includes 
                    but is not limited to damages for loss of profits, data, or other intangibles.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">6. Modifications to Terms</h3>
                  <p>
                    HomeMatch reserves the right to modify these terms at any time. We will notify users of 
                    any material changes via email or through the service. Continued use of the service after 
                    such modifications constitutes acceptance of the updated terms.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">7. Governing Law</h3>
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of the State 
                    of California, without regard to its conflict of law provisions.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Privacy Policy */}
        <TabsContent value="privacy">
          <Card>
            <CardContent className="p-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
                <h1>Privacy Policy</h1>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">Last Updated: November 6, 2025</p>
              
              <div className="space-y-6 text-gray-600">
                <section>
                  <h3 className="mb-3">1. Information We Collect</h3>
                  <p className="mb-2">We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Account information (name, email, phone number)</li>
                    <li>Search preferences and criteria</li>
                    <li>Property viewing and interaction history</li>
                    <li>Communications with agents and support</li>
                    <li>Payment information (processed securely by third parties)</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">2. How We Use Your Information</h3>
                  <p className="mb-2">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Personalize your property recommendations</li>
                    <li>Send you alerts about new matching properties</li>
                    <li>Communicate with you about your account or transactions</li>
                    <li>Analyze usage patterns and improve user experience</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">3. Information Sharing</h3>
                  <p>
                    We do not sell your personal information. We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Property agents and owners when you express interest in a listing</li>
                    <li>Service providers who perform services on our behalf</li>
                    <li>Law enforcement when required by law</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">4. Data Security</h3>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction. However, 
                    no internet transmission is completely secure, and we cannot guarantee absolute security.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">5. Your Rights</h3>
                  <p className="mb-2">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Access and receive a copy of your personal data</li>
                    <li>Correct inaccurate personal data</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">6. Contact Us</h3>
                  <p>
                    If you have questions about this Privacy Policy, please contact us at 
                    privacy@homematch.com or write to us at:
                  </p>
                  <p className="mt-2">
                    HomeMatch Privacy Team<br />
                    123 Main Street<br />
                    San Francisco, CA 94102
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Cookies Policy */}
        <TabsContent value="cookies">
          <Card>
            <CardContent className="p-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-8 w-8 text-blue-600" />
                <h1>Cookies Policy</h1>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">Last Updated: November 6, 2025</p>
              
              <div className="space-y-6 text-gray-600">
                <section>
                  <h3 className="mb-3">What Are Cookies?</h3>
                  <p>
                    Cookies are small text files that are placed on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and 
                    understanding how you use our service.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">Types of Cookies We Use</h3>
                  
                  <div className="space-y-4 mt-4">
                    <div>
                      <h4 className="mb-2">Essential Cookies</h4>
                      <p className="text-sm">
                        These cookies are necessary for the website to function properly. They enable core 
                        functionality such as security, authentication, and remembering your login status.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="mb-2">Performance Cookies</h4>
                      <p className="text-sm">
                        These cookies help us understand how visitors interact with our website by collecting 
                        and reporting information anonymously. This helps us improve our service.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="mb-2">Functionality Cookies</h4>
                      <p className="text-sm">
                        These cookies allow the website to remember choices you make (such as your search 
                        preferences) to provide enhanced, personalized features.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="mb-2">Targeting Cookies</h4>
                      <p className="text-sm">
                        These cookies may be set through our site by our advertising partners to build a 
                        profile of your interests and show you relevant advertisements on other sites.
                      </p>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">Managing Cookies</h3>
                  <p>
                    Most web browsers allow you to control cookies through their settings preferences. 
                    However, limiting cookies may impact your experience of our website and limit the 
                    functionality available to you.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">Third-Party Cookies</h3>
                  <p>
                    We may also use third-party cookies from trusted partners such as Google Analytics to 
                    help analyze how users use the site. These partners have their own privacy policies.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h3 className="mb-3">Updates to This Policy</h3>
                  <p>
                    We may update this Cookies Policy from time to time. Any changes will be posted on this 
                    page with an updated revision date.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
