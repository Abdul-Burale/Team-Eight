import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import { Login } from './components/auth/Login';
import { SignUp } from './components/auth/SignUp';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { SearchResults } from './components/SearchResults';
import { EnhancedPropertyDetails } from './components/EnhancedPropertyDetails';
import { UserProfile } from './components/UserProfile';
import { LegalEngagement } from './components/LegalEngagement';
import { SmartAlerts } from './components/SmartAlerts';
import { MarketIntelligence } from './components/MarketIntelligence';
import { Contact } from './components/Contact';
import { About } from './components/About';

type Page = 'home' | 'search' | 'property' | 'profile' | 'legal' | 'alerts' | 'market' | 'contact' | 'about' | 'login' | 'signup';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>(1);

  // Redirect to appropriate page based on auth state
  useEffect(() => {
    if (loading) return;

    // If user just logged in and is on login/signup page, redirect to home
    if (user && (currentPage === 'login' || currentPage === 'signup')) {
      console.log('User logged in, redirecting to home');
      setCurrentPage('home');
      return;
    }

    // User is not logged in and trying to access protected pages
    if (!user && currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'about') {
      if (['profile', 'alerts', 'legal'].includes(currentPage)) {
        console.log('Redirecting to login - protected page requires authentication');
        setCurrentPage('login');
      }
    }
  }, [user, loading, currentPage]);

  const handleNavigation = (page: string, propertyId?: number) => {
    // Check if user needs to be logged in for certain pages
    if (!user && ['profile', 'alerts', 'legal'].includes(page)) {
      setCurrentPage('login');
      return;
    }

    setCurrentPage(page as Page);
    if (propertyId !== undefined) {
      setSelectedPropertyId(propertyId);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login/signup pages
  if (currentPage === 'login') {
    return <Login onNavigate={handleNavigation} />;
  }

  if (currentPage === 'signup') {
    return <SignUp onNavigate={handleNavigation} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'search':
        return <SearchResults onNavigate={handleNavigation} />;
      case 'property':
        return <EnhancedPropertyDetails propertyId={selectedPropertyId} onNavigate={handleNavigation} />;
      case 'profile':
        return <UserProfile onNavigate={handleNavigation} />;
      case 'legal':
        return <LegalEngagement />;
      case 'alerts':
        return <SmartAlerts />;
      case 'market':
        return <MarketIntelligence />;
      case 'contact':
        return <Contact />;
      case 'about':
        return <About />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onNavigate={handleNavigation} currentPage={currentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
