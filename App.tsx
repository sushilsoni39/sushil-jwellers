
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Diamond, 
  Store, 
  ShoppingCart, 
  History, 
  ShieldCheck, 
  LayoutDashboard,
  TrendingUp,
  Search,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  User,
  CreditCard,
  CheckCircle2,
  Trash2,
  RefreshCw,
  BarChart3,
  Calendar,
  IndianRupee,
  QrCode,
  Smartphone,
  Info,
  ChevronRight,
  Loader2,
  LogOut,
  MapPin,
  Lock,
  Mail,
  UserPlus,
  AlertCircle,
  Truck,
  Sparkles,
  FileText,
  Download,
  Printer,
  ExternalLink,
  Layers,
  Zap,
  Star,
  Instagram,
  Facebook,
  Twitter,
  PhoneCall,
  Heart,
  Check,
  Eye
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MetalType, Purity, Product, Bill, MetalPrice, CustomerUser, AdminUser, ShippingAddress } from './types';
import { SAMPLE_PRODUCTS, INITIAL_PRICES, MAKING_CHARGES_PERCENT, GST_PERCENT } from './constants';
import { geminiService } from './services/geminiService';

// Realistic Shop Seal Component
const ShopSeal: React.FC<{ color?: string }> = ({ color = "#b91c1c" }) => (
  <div className="relative w-32 h-32 flex items-center justify-center transform rotate-[-12deg] opacity-80 select-none pointer-events-none">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
      </defs>
      {/* Distressed outer circle */}
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" strokeDasharray="1,1" opacity="0.6" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="0.8" />
      
      {/* Circular Text */}
      <text fill={color} fontSize="7.5" fontWeight="900" letterSpacing="1.2">
        <textPath xlinkHref="#circlePath">
          SUSHIL JEWELLERS • HAJIPUR • BIHAR • ESTD 1985 •
        </textPath>
      </text>
      
      {/* Center Text */}
      <rect x="20" y="42" width="60" height="16" fill="white" stroke={color} strokeWidth="1" rx="1" />
      <text x="50" y="53" textAnchor="middle" fill={color} fontSize="9" fontWeight="900" letterSpacing="0.5">
        AUTHORIZED
      </text>
      <text x="50" y="38" textAnchor="middle" fill={color} fontSize="5" fontWeight="800">
        PHULHARA BAZAR
      </text>
      <text x="50" y="65" textAnchor="middle" fill={color} fontSize="5" fontWeight="800">
        GST REGISTERED
      </text>
    </svg>
    {/* Subtle texture/noise overlay to mimic ink on paper */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply opacity-20"></div>
  </div>
);

// Reusable Add to Cart Button with Animation
const AddToCartButton: React.FC<{ 
  onAdd: () => void, 
  className?: string, 
  iconOnly?: boolean,
  label?: string 
}> = ({ onAdd, className, iconOnly, label = "Acquire Masterpiece" }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    onAdd();
    setTimeout(() => setIsAdded(false), 800);
  };

  if (iconOnly) {
    return (
      <button 
        onClick={handleClick} 
        className={`${className} flex items-center justify-center transition-all duration-300 transform ${isAdded ? 'bg-green-500 scale-125 rotate-0 text-white' : ''}`}
      >
        {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick} 
      className={`${className} flex items-center justify-center gap-2 transition-all duration-300 transform ${isAdded ? 'bg-green-500 scale-105 text-white' : ''}`}
    >
      {isAdded ? <CheckCircle2 size={14} /> : null}
      <span>{isAdded ? 'Added to Vault' : label}</span>
    </button>
  );
};

// NavItem component for sidebar navigation
const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-amber-500 text-slate-900 shadow-lg scale-105' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 18 }) : icon}
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-16 px-6 lg:px-10 border-t border-slate-800 no-print">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-lg">
            <Diamond className="w-6 h-6 text-slate-900" />
          </div>
          <h2 className="text-xl font-serif font-bold tracking-widest text-amber-100 leading-tight">SUSHIL<br/><span className="text-xs uppercase font-sans tracking-tighter opacity-70 font-bold">Jewellers</span></h2>
        </div>
        <p className="text-sm leading-relaxed font-medium">
          Legacy of trust and exquisite craftsmanship since 1985. We specialize in handcrafted gold, silver, and platinum artifacts that define royalty.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-amber-500 transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-amber-500 transition-colors"><Facebook size={20} /></a>
          <a href="#" className="hover:text-amber-500 transition-colors"><Twitter size={20} /></a>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-white text-xs font-black uppercase tracking-[0.3em]">Visit Our Atelier</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-amber-500 mt-1 flex-shrink-0" />
            <p className="text-sm font-medium leading-relaxed">
              Phulhara Bazar, Hajipur,<br />
              Bihar - 844502, India
            </p>
          </div>
          <div className="flex items-start gap-3">
            <PhoneCall size={18} className="text-amber-500 mt-1 flex-shrink-0" />
            <p className="text-sm font-medium leading-relaxed">
              +91 96317 13085<br />
              +91 99010 81140
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-white text-xs font-black uppercase tracking-[0.3em]">Customer Concierge</h3>
        <ul className="space-y-3 text-sm font-medium">
          <li><a href="#" className="hover:text-white transition-colors">Book an Appointment</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Bespoke Jewelry Design</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Purity Verification</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="space-y-6">
        <h3 className="text-white text-xs font-black uppercase tracking-[0.3em]">Corporate Registry</h3>
        <div className="space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">GST Registration</p>
            <p className="text-sm font-mono font-bold text-amber-500">08AAACD1234F1Z1</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">BIS Certification</p>
            <p className="text-sm font-bold text-slate-200">Hallmarked 916 Gold</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest">
      <p>© 2024 Sushil Jewellers. All rights reserved.</p>
      <p className="flex items-center gap-2">Designed with <Zap size={10} className="text-amber-500" /> for Pure Elegance</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'billing' | 'history' | 'analytics' | 'orders' | 'wishlist'>('catalog');
  const [prices, setPrices] = useState<MetalPrice[]>(INITIAL_PRICES);
  const [cart, setCart] = useState<any[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [marketInsights, setMarketInsights] = useState<{ [key: string]: string }>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUpdatingPrices, setIsUpdatingPrices] = useState(false);
  const [viewingBill, setViewingBill] = useState<Bill | null>(null);

  // Auth State
  const [currentUser, setCurrentUser] = useState<CustomerUser | AdminUser | null>(null);
  const [users, setUsers] = useState<CustomerUser[]>([]);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'otp' | 'admin-login' | null>(null);
  const [authFormData, setAuthFormData] = useState({ email: '', phone: '', password: '', fullName: '', otp: '', adminUsername: '' });
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    handleRefreshLivePrices();
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        pricePerGram: Number((p.pricePerGram + (Math.random() - 0.5) * 5).toFixed(2)),
        change: Number(((Math.random() - 0.5) * 2).toFixed(2))
      })));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      const gold = await geminiService.getMarketInsight('Gold');
      const silver = await geminiService.getMarketInsight('Silver');
      setMarketInsights({ Gold: gold, Silver: silver });
    };
    fetchInsights();
  }, []);

  const handleRefreshLivePrices = async () => {
    setIsUpdatingPrices(true);
    const liveData = await geminiService.fetchLivePrices();
    if (liveData) {
      setPrices([
        { type: MetalType.GOLD, pricePerGram: liveData.gold, change: 0.1 },
        { type: MetalType.SILVER, pricePerGram: liveData.silver, change: -0.2 },
        { type: MetalType.PLATINUM, pricePerGram: liveData.platinum, change: 0.05 },
      ]);
    }
    setIsUpdatingPrices(false);
  };

  const handleAddBill = (bill: Bill) => {
    setBills([bill, ...bills]);
    setCart([]);
    setActiveTab(currentUser?.role === 'ADMIN' ? 'history' : 'orders');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleAuthSubmit = () => {
    setAuthError(null);
    if (authMode === 'admin-login') {
      if (authFormData.adminUsername.toLowerCase() === 'admin' && authFormData.password === 'admin123') {
        setCurrentUser({ role: 'ADMIN' });
        setAuthMode(null);
        setActiveTab('analytics');
      } else {
        setAuthError('Invalid Admin credentials. Access Denied.');
      }
    } else if (authMode === 'signup') {
      const exists = users.find(u => u.email === authFormData.email || u.phone === authFormData.phone);
      if (exists) return setAuthError('User already exists with this Email or Phone. Please Login.');
      
      const newUser: CustomerUser = {
        id: `USR-${Date.now()}`,
        fullName: authFormData.fullName,
        email: authFormData.email,
        phone: authFormData.phone,
        password: authFormData.password,
        role: 'CUSTOMER'
      };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setAuthMode(null);
    } else if (authMode === 'login') {
      const userExists = users.find(u => u.email === authFormData.email || u.phone === authFormData.phone);
      if (!userExists) {
        setAuthError('No account found with these details. Would you like to create one?');
        return;
      }
      const validUser = users.find(u => (u.email === authFormData.email || u.phone === authFormData.phone) && u.password === authFormData.password);
      if (validUser) {
        setCurrentUser(validUser);
        setAuthMode(null);
      } else {
        setAuthError('Incorrect password. Please try again or reset.');
      }
    } else if (authMode === 'forgot') {
      const user = users.find(u => u.phone === authFormData.phone);
      if (user) setAuthMode('otp');
      else setAuthError('Phone number not registered with any account.');
    } else if (authMode === 'otp') {
      if (authFormData.otp === '1234') { 
        const user = users.find(u => u.phone === authFormData.phone);
        if (user) {
          setCurrentUser(user);
          setAuthMode(null);
          alert('Access granted via OTP. Please update password in profile.');
        }
      } else setAuthError('Invalid OTP code. Please enter 1234.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('catalog');
  };

  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#faf9f6]">
      {/* Sidebar - Fixed to full height on Desktop */}
      <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky lg:top-0 z-40 w-64 lg:h-screen bg-slate-900 text-white transition-transform duration-300 ease-in-out border-r border-slate-800 shadow-2xl no-print overflow-y-auto`}>
        <div className="p-8 flex flex-col h-full min-h-screen lg:min-h-full">
          <div className="flex items-center gap-3 mb-12 group cursor-pointer" onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }}>
            <div className="bg-amber-500 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-amber-500/20">
              <Diamond className="w-6 h-6 text-slate-900" />
            </div>
            <h1 className="text-xl font-serif font-bold tracking-widest text-amber-100 leading-tight">SUSHIL<br/><span className="text-xs uppercase font-sans tracking-tighter opacity-70 font-bold">Jewellers</span></h1>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem icon={<Store />} label="Catalog" active={activeTab === 'catalog'} onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }} />
            <NavItem icon={<LayoutDashboard />} label="Bullion Market" active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} />
            
            <div className="pt-4 mt-4 border-t border-slate-800">
              <p className="px-4 text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-black">Account</p>
              {!currentUser && (
                <>
                  <NavItem icon={<User />} label="Sign In" active={false} onClick={() => { setAuthMode('login'); setAuthError(null); }} />
                  <NavItem icon={<UserPlus />} label="Create Account" active={false} onClick={() => { setAuthMode('signup'); setAuthError(null); }} />
                </>
              )}
              {currentUser && currentUser.role === 'CUSTOMER' && (
                <>
                  <NavItem icon={<Heart />} label="Wishlist" active={activeTab === 'wishlist'} onClick={() => { setActiveTab('wishlist'); setMobileMenuOpen(false); }} />
                  <NavItem icon={<History />} label="My Orders" active={activeTab === 'orders'} onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }} />
                </>
              )}
              {isAdmin && (
                <>
                  <NavItem icon={<BarChart3 />} label="Dashboard" active={activeTab === 'analytics'} onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }} />
                  <NavItem icon={<ShoppingCart />} label="New Invoice" active={activeTab === 'billing'} onClick={() => { setActiveTab('billing'); setMobileMenuOpen(false); }} />
                  <NavItem icon={<History />} label="Store Ledger" active={activeTab === 'history'} onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }} />
                </>
              )}
            </div>
          </nav>

          <div className="mt-auto pt-8 space-y-4">
            {currentUser && (
               <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20 group">
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">Logout</span>
              </button>
            )}
            {!isAdmin && (
              <button 
                onClick={() => { setAuthMode('admin-login'); setAuthError(null); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20 transition-all group"
              >
                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">Admin Portal</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-30 shadow-sm no-print">
          <div className="flex items-center gap-2">
             <Diamond className="w-5 h-5 text-amber-600" />
             <span className="font-serif font-bold text-slate-800">Sushil Jewellers</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="no-print">
            {activeTab === 'catalog' && (
              <CatalogPage 
                products={SAMPLE_PRODUCTS} 
                prices={prices} 
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
                onAddToCart={(p) => {
                  setCart([...cart, p]);
                  setActiveTab('billing');
                }} 
              />
            )}
            <div className="p-6 lg:p-10 max-w-7xl mx-auto">
              {activeTab === 'wishlist' && (
                <WishlistPage 
                  products={SAMPLE_PRODUCTS.filter(p => wishlist.includes(p.id))} 
                  prices={prices}
                  onToggleWishlist={toggleWishlist}
                  onAddToCart={(p) => {
                    setCart([...cart, p]);
                    setActiveTab('billing');
                  }}
                />
              )}
              {activeTab === 'home' && <HomePage prices={prices} insights={marketInsights} onRefresh={handleRefreshLivePrices} loading={isUpdatingPrices} />}
              {activeTab === 'billing' && (
                <BillingPage 
                  cart={cart} 
                  prices={prices} 
                  onComplete={handleAddBill} 
                  onRemoveFromCart={(id) => setCart(cart.filter(p => p.id !== id))} 
                  onAddToCart={(p) => setCart([...cart, p])}
                  currentUser={currentUser}
                  onReqLogin={() => { setAuthMode('login'); setAuthError(null); }}
                />
              )}
              {activeTab === 'history' && isAdmin && <HistoryPage bills={bills} onViewBill={setViewingBill} />}
              {activeTab === 'analytics' && isAdmin && <AnalyticsPage bills={bills} />}
              {activeTab === 'orders' && !isAdmin && currentUser && (
                <HistoryPage bills={bills.filter(b => b.customerId === (currentUser as CustomerUser).id)} title="My Order History" onViewBill={setViewingBill} />
              )}
            </div>
          </div>
          
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      {authMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300 no-print">
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden border border-amber-100 scale-95 md:scale-100">
            <div className="p-6 text-center bg-slate-50 border-b relative">
              <button onClick={() => setAuthMode(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X /></button>
              <div className="mx-auto bg-amber-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-3">
                {authMode === 'admin-login' ? <ShieldCheck className="w-7 h-7 text-amber-600" /> : <User className="w-7 h-7 text-amber-600" />}
              </div>
              <h2 className="text-xl font-serif font-bold text-slate-800">
                {authMode === 'login' && 'Sign In'}
                {authMode === 'signup' && 'Create Account'}
                {authMode === 'forgot' && 'Reset Password'}
                {authMode === 'otp' && 'Verify OTP'}
                {authMode === 'admin-login' && 'Admin Portal'}
              </h2>
              {authError && (
                <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-left animate-in slide-in-from-top-2">
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-red-600 leading-tight">{authError}</p>
                    {authError.includes('create one') && (
                      <button onClick={() => { setAuthMode('signup'); setAuthError(null); }} className="text-[9px] font-black uppercase text-amber-700 mt-2 block hover:underline">Sign up now &rarr;</button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              {authMode === 'admin-login' && (
                <AuthInput icon={<ShieldCheck />} label="Admin Username" value={authFormData.adminUsername} onChange={v => setAuthFormData({...authFormData, adminUsername: v})} placeholder="admin" />
              )}
              {authMode === 'signup' && (
                <AuthInput icon={<User />} label="Full Name" value={authFormData.fullName} onChange={v => setAuthFormData({...authFormData, fullName: v})} placeholder="Enter name" />
              )}
              {authMode !== 'otp' && authMode !== 'admin-login' && authMode !== 'forgot' && (
                <AuthInput icon={<Mail />} label="Email Address" value={authFormData.email} onChange={v => setAuthFormData({...authFormData, email: v})} placeholder="mail@example.com" />
              )}
              {(authMode === 'signup' || authMode === 'forgot' || authMode === 'otp') && (
                <AuthInput icon={<Smartphone />} label="Phone Number" value={authFormData.phone} onChange={v => setAuthFormData({...authFormData, phone: v})} placeholder="+91 XXXXX XXXXX" />
              )}
              {authMode !== 'otp' && authMode !== 'forgot' && (
                <AuthInput icon={<Lock />} label="Password" type="password" value={authFormData.password} onChange={v => setAuthFormData({...authFormData, password: v})} placeholder="••••••••" />
              )}
              {authMode === 'otp' && (
                <AuthInput icon={<Lock />} label="Verification Code" value={authFormData.otp} onChange={v => setAuthFormData({...authFormData, otp: v})} placeholder="Enter 1234 (Mock OTP)" />
              )}
              
              <button onClick={handleAuthSubmit} className="w-full bg-slate-900 text-white font-black py-3.5 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all uppercase tracking-widest text-[10px] shadow-lg active:scale-95">
                {authMode === 'login' && 'Enter Store'}
                {authMode === 'signup' && 'Register Account'}
                {authMode === 'forgot' && 'Send OTP'}
                {authMode === 'otp' && 'Verify & Login'}
                {authMode === 'admin-login' && 'Authorize Admin'}
              </button>

              <div className="flex flex-col gap-2 text-center text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-3">
                {authMode === 'login' && (
                  <>
                    <button onClick={() => { setAuthMode('signup'); setAuthError(null); }} className="hover:text-amber-600 transition-colors">New here? Create Account</button>
                    <button onClick={() => { setAuthMode('forgot'); setAuthError(null); }} className="hover:text-amber-600 transition-colors">Forgot Password?</button>
                  </>
                )}
                {authMode === 'signup' && (
                  <button onClick={() => { setAuthMode('login'); setAuthError(null); }} className="hover:text-amber-600 transition-colors">Already have an account? Login</button>
                )}
                {authMode === 'admin-login' && (
                   <button onClick={() => { setAuthMode('login'); setAuthError(null); }} className="hover:text-amber-600 transition-colors">Back to Customer Login</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Detail View Overlay */}
      {viewingBill && (
        <InvoiceModal bill={viewingBill} onClose={() => setViewingBill(null)} />
      )}
    </div>
  );
};

const InvoiceModal: React.FC<{ bill: Bill, onClose: () => void }> = ({ bill, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-printable');
    if (!element) return;
    
    setIsGenerating(true);
    try {
      await new Promise(r => setTimeout(r, 100));
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SushilJewellers_Invoice_${bill.id}.pdf`);
    } catch (err) {
      console.error("PDF Generation Error:", err);
      alert("Failed to generate PDF. Please try the standard Print option.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300 no-print">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="text-amber-600" size={20} />
            <h3 className="text-xl font-serif font-bold text-slate-800">Digital Tax Invoice</h3>
          </div>
          <div className="flex items-center gap-3">
            <button disabled={isGenerating} onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all disabled:opacity-50 shadow-md">
              {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>
            <button onClick={handlePrint} className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
              <Printer size={14} /> Print
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><X /></button>
          </div>
        </header>

        <div id="invoice-printable" className="p-12 bg-white">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 p-3 rounded-xl">
                    <Diamond className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-serif font-bold tracking-widest text-slate-900 leading-none">SUSHIL</h1>
                    <p className="text-xs uppercase font-sans tracking-[0.4em] font-black text-slate-400">Jewellers</p>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-bold leading-relaxed max-w-xs">
                  Phulhara Bazar, Hajipur, Bihar - 844502<br/>
                  GSTIN: 08AAACD1234F1Z1 | PH: +91 96317 13085
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-5xl font-serif font-bold text-slate-200 uppercase tracking-tighter opacity-50 mb-4">Receipt</h2>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice ID</p>
                  <p className="font-mono text-lg font-bold text-slate-900">#{bill.id}</p>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date Issued</p>
                  <p className="font-bold text-slate-900">{new Date(bill.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 border-t border-b border-slate-100 py-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Customer Details</p>
                <div>
                  <p className="text-xl font-serif font-bold text-slate-900">{bill.customerName}</p>
                  <p className="text-sm font-medium text-slate-500">{bill.customerPhone}</p>
                </div>
              </div>
              {bill.shippingAddress && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Shipping Logistics</p>
                  <div className="text-sm font-medium text-slate-500 leading-relaxed">
                    {bill.shippingAddress.line1}, {bill.shippingAddress.city}<br/>
                    {bill.shippingAddress.state} - {bill.shippingAddress.pincode}
                  </div>
                </div>
              )}
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-slate-900">
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Merchandise Description</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Weight</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Rate/g</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Charges</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bill.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-6 pr-4">
                      <p className="font-bold text-slate-900">{item.productName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Certification: Bis Hallmarked</p>
                    </td>
                    <td className="py-6 text-right font-medium text-slate-600">{item.weight}g</td>
                    <td className="py-6 text-right font-medium text-slate-600">₹{item.rate.toLocaleString()}</td>
                    <td className="py-6 text-right font-medium text-slate-600">₹{item.makingCharges.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="py-6 text-right font-black text-slate-900">₹{item.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end pt-8">
              <div className="w-full max-w-xs space-y-4">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{bill.subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>IGST / CGST (3%)</span>
                  <span>₹{bill.tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-slate-900">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Grand Total</span>
                  <span className="text-3xl font-serif font-bold text-amber-600">₹{bill.grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="pt-4 flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Payment: {bill.paymentMethod}</span>
                  <span className="text-green-600 uppercase font-black">Settled</span>
                </div>
              </div>
            </div>

            <div className="pt-12 grid grid-cols-2 gap-12 border-t border-slate-100">
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Terms & Assurance</p>
                <ul className="text-[9px] text-slate-400 font-bold space-y-1.5 leading-tight list-disc pl-4">
                  <li>Standard 15% making charges applied on net metal weight.</li>
                  <li>Exchange value subject to purity verification by laboratory.</li>
                  <li>This is a computer-generated digital tax invoice.</li>
                </ul>
              </div>
              <div className="text-right flex flex-col items-end justify-center relative">
                <div className="absolute right-0 top-[-20px]">
                  <ShopSeal />
                </div>
                <p className="mt-16 text-[10px] font-black uppercase tracking-widest text-slate-900 italic relative z-10 bg-white/50 px-2">Sushil Jewellers Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthInput: React.FC<{ icon: React.ReactNode, label: string, value: string, onChange: (v: string) => void, placeholder: string, type?: string }> = ({ icon, label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 16 }) : icon}
      </div>
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm font-medium text-slate-900" 
      />
    </div>
  </div>
);

const HomePage: React.FC<{ prices: MetalPrice[], insights: any, onRefresh: () => void, loading: boolean }> = ({ prices, insights, onRefresh, loading }) => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-800 mb-2">Precious Metal Rates</h1>
        <p className="text-slate-500 max-w-lg font-medium">Live bullion prices sourced from major Indian exchanges.</p>
      </div>
      <button onClick={onRefresh} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-amber-400 transition-all shadow-sm active:scale-95">
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Fetching...' : 'Sync Rates'}
      </button>
    </header>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {prices.map(p => <PriceCard key={p.type} price={p} insight={insights[p.type]} />)}
    </section>
  </div>
);

const PriceCard: React.FC<{ price: MetalPrice, insight?: string }> = ({ price, insight }) => {
  const metalImages: Record<string, string> = {
    [MetalType.GOLD]: 'https://images.unsplash.com/photo-1589118944245-7d399fb45526?auto=format&fit=crop&w=600&q=80',
    [MetalType.SILVER]: 'https://images.unsplash.com/photo-1610375461246-83df8bc0d802?auto=format&fit=crop&w=600&q=80',
    [MetalType.PLATINUM]: 'https://images.unsplash.com/photo-1543157145-f78c636d023d?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <div className="glass-card p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden relative border-amber-100/50 h-full flex flex-col">
      {/* Decorative metal image */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
        <img src={metalImages[price.type]} alt="" className="w-full h-full object-cover rounded-bl-[3rem]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#faf9f6] to-transparent" />
      </div>
      
      <div className="relative z-10 flex-1">
        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 block">Bullion: {price.type}</span>
        <h4 className="text-3xl font-bold text-slate-800 font-serif">₹{price.pricePerGram.toLocaleString()}<span className="text-xs font-sans text-slate-400 ml-1">/ g</span></h4>
        <div className={`mt-3 flex items-center gap-1 text-[11px] font-bold ${price.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {price.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />} {Math.abs(price.change)}%
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 group-hover:border-amber-200 transition-colors relative z-10">
        <p className="text-[11px] text-slate-500 italic leading-relaxed">"{insight || 'Loading market sentiment...'}"</p>
      </div>
    </div>
  );
};

// Enhanced Catalog Page with refined Product Grid
const CatalogPage: React.FC<{ 
  products: Product[], 
  prices: MetalPrice[], 
  onAddToCart: (p: Product) => void,
  wishlist: string[],
  onToggleWishlist: (id: string) => void
}> = ({ products, prices, onAddToCart, wishlist, onToggleWishlist }) => {
  const [selectedMetal, setSelectedMetal] = useState<MetalType | 'All'>('All');

  const filteredProducts = useMemo(() => {
    if (selectedMetal === 'All') return products;
    return products.filter(p => p.metal === selectedMetal);
  }, [products, selectedMetal]);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Flashy Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40" />
        </div>
        <div className="relative z-10 text-center px-4 space-y-8">
          <div className="flex justify-center mb-6">
             <div className="p-5 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/30 animate-bounce shadow-2xl shadow-amber-500/20">
                <Star className="text-amber-400" size={32} />
             </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-none">The Crown Jewel <br/><span className="text-amber-400 italic">Collection</span></h1>
            <p className="text-amber-100/60 max-w-xl mx-auto text-sm md:text-lg font-medium tracking-wide">Explore handcrafted masterpieces where every artifact tells a story of royalty, heritage, and timeless elegance.</p>
          </div>
          <div className="flex gap-4 justify-center pt-6">
             <button onClick={() => {
                document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
             }} className="px-10 py-4 bg-amber-500 text-slate-900 font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:scale-110 transition-all shadow-2xl shadow-amber-500/30">Explore Masterpieces</button>
          </div>
        </div>
      </section>

      <div id="catalog-grid" className="p-6 lg:p-10 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-10">
          <div className="space-y-1">
             <h2 className="text-4xl font-serif font-bold text-slate-800">Curation Registry</h2>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Exquisite Handcrafted Masterpieces</p>
          </div>
          <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100">
             <button 
                onClick={() => setSelectedMetal('All')}
                className={`px-6 py-2.5 text-[9px] font-black uppercase rounded-xl tracking-widest transition-all ${selectedMetal === 'All' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 hover:text-amber-600'}`}>
                All Treasures
             </button>
             <button 
                onClick={() => setSelectedMetal(MetalType.GOLD)}
                className={`px-6 py-2.5 text-[9px] font-black uppercase rounded-xl tracking-widest transition-all ${selectedMetal === MetalType.GOLD ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 hover:text-amber-600'}`}>
                Gold
             </button>
             <button 
                onClick={() => setSelectedMetal(MetalType.SILVER)}
                className={`px-6 py-2.5 text-[9px] font-black uppercase rounded-xl tracking-widest transition-all ${selectedMetal === MetalType.SILVER ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 hover:text-amber-600'}`}>
                Silver
             </button>
             <button 
                onClick={() => setSelectedMetal(MetalType.PLATINUM)}
                className={`px-6 py-2.5 text-[9px] font-black uppercase rounded-xl tracking-widest transition-all ${selectedMetal === MetalType.PLATINUM ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 hover:text-amber-600'}`}>
                Platinum
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20">
          {filteredProducts.map(product => {
            const rate = prices.find(p => p.type === product.metal)?.pricePerGram || 0;
            const total = (product.weight * rate) * (1 + MAKING_CHARGES_PERCENT) * (1 + GST_PERCENT);
            const inWishlist = wishlist.includes(product.id);
            
            return (
              <div key={product.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 flex flex-col h-full transform hover:-translate-y-3">
                <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden">
                   {/* Fallback image handler */}
                   <img 
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s] ease-out" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80';
                    }}
                   />
                   
                   {/* Top actions */}
                   <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                      <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black text-amber-700 uppercase tracking-widest shadow-lg flex items-center gap-2 border border-amber-100/50">
                         <Diamond size={10} className="animate-pulse" /> {product.purity} {product.metal}
                      </div>
                      <button 
                        onClick={() => onToggleWishlist(product.id)}
                        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${inWishlist ? 'bg-amber-500 text-white scale-110' : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white'}`}
                      >
                        <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                      </button>
                   </div>

                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end p-8 gap-3">
                      <AddToCartButton 
                        onAdd={() => onAddToCart(product)} 
                        className="flex-1 py-4 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-amber-500 hover:text-slate-900" 
                      />
                      <button className="p-4 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white hover:text-slate-900 transition-all border border-white/20">
                         <Eye size={18} />
                      </button>
                   </div>
                </div>
                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <div className="flex justify-between items-start">
                           <h3 className="text-2xl font-serif font-bold text-slate-800 leading-tight pr-4">{product.name}</h3>
                           <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm flex-shrink-0">ESTD 1985</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{product.weight}g Net Mass • Certified Hallmark</p>
                     </div>
                     <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic line-clamp-3">"{product.description}"</p>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Estimated Value</span>
                       <span className="text-2xl font-serif font-bold text-amber-600">₹{total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <AddToCartButton 
                      onAdd={() => onAddToCart(product)} 
                      iconOnly 
                      className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-amber-500 hover:text-slate-900 shadow-xl group-hover:rotate-12" 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Wishlist Page Component
const WishlistPage: React.FC<{ 
  products: Product[], 
  prices: MetalPrice[], 
  onToggleWishlist: (id: string) => void,
  onAddToCart: (p: Product) => void 
}> = ({ products, prices, onToggleWishlist, onAddToCart }) => (
  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 py-10">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-800">My Wishlist</h1>
        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Treasures you desire</p>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 bg-white px-6 py-4 rounded-full border border-slate-100 shadow-sm">{products.length} Curated Items</p>
    </div>

    {products.length === 0 ? (
      <div className="bg-white rounded-[3rem] p-32 text-center border border-slate-100 flex flex-col items-center shadow-sm">
        <Heart size={80} className="text-slate-100 mb-8" />
        <p className="text-slate-400 font-medium text-xl italic tracking-tight">Your vault of desires is currently empty.</p>
        <p className="text-slate-300 text-sm mt-4">Browse our collection and save items you love.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(product => {
          const rate = prices.find(p => p.type === product.metal)?.pricePerGram || 0;
          const total = (product.weight * rate) * (1 + MAKING_CHARGES_PERCENT) * (1 + GST_PERCENT);
          return (
            <div key={product.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-50 flex flex-col h-full relative">
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className="absolute top-6 right-6 z-20 bg-amber-500 text-white p-3 rounded-full shadow-lg"
              >
                <Heart size={18} fill="currentColor" />
              </button>
              
              <div className="aspect-square bg-slate-50 relative overflow-hidden">
                 <img 
                  src={product.imageUrl} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80';
                  }}
                 />
                 <div className="absolute inset-0 bg-black/5" />
              </div>
              
              <div className="p-8 space-y-4">
                <div className="space-y-3">
                   <div className="space-y-1">
                      <h3 className="text-xl font-serif font-bold text-slate-800 leading-tight">{product.name}</h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{product.weight}g • {product.metal}</p>
                   </div>
                   <p className="text-[10px] text-slate-500 font-medium italic line-clamp-2">"{product.description}"</p>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                   <span className="text-xl font-serif font-bold text-amber-600 font-serif">₹{total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                   <AddToCartButton 
                    onAdd={() => onAddToCart(product)} 
                    iconOnly 
                    className="bg-slate-900 text-white p-3 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg" 
                   />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const BillingPage: React.FC<{ 
  cart: any[], 
  prices: MetalPrice[], 
  onComplete: (b: Bill) => void, 
  onRemoveFromCart: (id: string) => void, 
  onAddToCart: (p: any) => void,
  currentUser: CustomerUser | AdminUser | null,
  onReqLogin: () => void
}> = ({ cart, prices, onComplete, onRemoveFromCart, onAddToCart, currentUser, onReqLogin }) => {
  const [shipping, setShipping] = useState<ShippingAddress>({ fullName: '', line1: '', city: '', state: '', pincode: '', phone: '' });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [manualName, setManualName] = useState('');
  const [manualWeight, setManualWeight] = useState('');
  const [manualMaking, setManualMaking] = useState('15');
  const [manualMetal, setManualMetal] = useState<MetalType>(MetalType.GOLD);

  const isAdmin = currentUser?.role === 'ADMIN';

  const estDeliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }, []);

  useEffect(() => {
    if (!isAdmin && currentUser && currentUser.role === 'CUSTOMER') {
      setShipping(prev => ({ ...prev, fullName: currentUser.fullName, phone: currentUser.phone }));
    }
  }, [currentUser]);

  const summary = useMemo(() => {
    let subtotal = 0; let tax = 0;
    const items = cart.map(p => {
      const rate = prices.find(pr => pr.type === p.metal)?.pricePerGram || 0;
      const metalCost = p.weight * rate;
      const makingPercent = p.isManual ? (parseFloat(p.makingChargesPercent) / 100) : MAKING_CHARGES_PERCENT;
      const making = metalCost * makingPercent;
      const gst = (metalCost + making) * GST_PERCENT;
      subtotal += (metalCost + making); tax += gst;
      return { productId: p.id, productName: p.name, weight: p.weight, rate, makingCharges: making, gst, total: metalCost + making + gst };
    });
    return { items, subtotal, tax, grandTotal: subtotal + tax };
  }, [cart, prices]);

  const handleManualAdd = () => {
    if (!manualName || !manualWeight) return;
    const newItem = {
      isManual: true,
      name: manualName,
      weight: parseFloat(manualWeight),
      makingChargesPercent: parseFloat(manualMaking),
      metal: manualMetal,
      id: `manual-${Date.now()}`
    };
    onAddToCart(newItem);
    setManualName('');
    setManualWeight('');
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!currentUser && !isAdmin) return onReqLogin();
      setStep(2);
    } else if (step === 2) {
      if (!shipping.line1 || !shipping.city || !shipping.pincode) return alert("Required: Delivery Coordinates");
      setStep(3);
    }
  };

  const handleFinalize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newBill: Bill = {
        id: `INV-${Date.now().toString().slice(-6)}`,
        customerId: currentUser?.role === 'CUSTOMER' ? currentUser.id : undefined,
        customerName: isAdmin ? 'In-Store Client' : shipping.fullName,
        customerPhone: isAdmin ? 'Internal' : shipping.phone,
        shippingAddress: isAdmin ? undefined : shipping,
        date: new Date().toISOString(),
        items: summary.items,
        subtotal: summary.subtotal,
        tax: summary.tax,
        grandTotal: summary.grandTotal,
        paymentMethod,
        status: 'Paid'
      };
      setIsProcessing(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        onComplete(newBill);
        setShowSuccessModal(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
      <div className="lg:col-span-2 space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-4xl font-serif font-bold text-slate-800">{isAdmin ? 'Secure Ledger Entry' : 'Acquisition Flow'}</h1>
          <div className="flex gap-3">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 w-14 rounded-full transition-all duration-700 shadow-sm ${step >= s ? 'bg-amber-500 shadow-amber-500/20' : 'bg-slate-200'}`} />
            ))}
          </div>
        </header>

        {step === 1 && (
          <div className="space-y-10 animate-in slide-in-from-left duration-500">
            {isAdmin && (
               <section className="bg-amber-50 rounded-[2.5rem] p-10 border border-amber-100 shadow-sm space-y-8">
                 <h3 className="text-2xl font-serif font-bold text-amber-800 flex items-center gap-3"><Layers size={24} /> Vault Registry</h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   <div className="md:col-span-2">
                     <AuthInput icon={<Diamond />} label="Artifact Identity" value={manualName} onChange={v => setManualName(v)} placeholder="Custom Jewelry Name" />
                   </div>
                   <div>
                     <AuthInput icon={<Zap />} label="Mass (g)" value={manualWeight} onChange={v => setManualWeight(v)} placeholder="0.00" />
                   </div>
                   <div className="flex items-end">
                     <button onClick={handleManualAdd} className="w-full h-[56px] bg-amber-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-amber-700 transition-all shadow-lg active:scale-95">Add to Queue</button>
                   </div>
                 </div>
               </section>
            )}

            <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-3"><ShoppingCart size={24} className="text-amber-500" /> Selection Queue</h3>
              {cart.map((item, i) => (
                 <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-amber-200 transition-all group">
                   <div className="flex items-center gap-6">
                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500"><Diamond size={28} className="text-amber-500/40" /></div>
                     <div>
                       <p className="font-bold text-slate-800 text-lg tracking-tight">{item.name}</p>
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">{item.weight}g • {item.metal} Purity Verified</p>
                     </div>
                   </div>
                   <button onClick={() => onRemoveFromCart(item.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors hover:bg-red-50 rounded-xl"><Trash2 size={20} /></button>
                 </div>
              ))}
              {cart.length === 0 && (
                 <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <Layers size={48} className="mx-auto text-slate-200 mb-6" />
                    <p className="text-slate-400 font-medium text-lg italic tracking-tight">Vault selection is currently empty.</p>
                 </div>
              )}
            </section>
          </div>
        )}

        {step === 2 && (
          <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-right duration-500">
            <h3 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-3"><MapPin size={24} className="text-amber-500" /> Delivery Coordinates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AuthInput icon={<User />} label="Consignee" value={shipping.fullName} onChange={v => setShipping({...shipping, fullName: v})} placeholder="Full Name" />
              <AuthInput icon={<Smartphone />} label="Encrypted Link" value={shipping.phone} onChange={v => setShipping({...shipping, phone: v})} placeholder="+91 Contact" />
              <div className="md:col-span-2">
                <AuthInput icon={<MapPin />} label="Logistics Destination" value={shipping.line1} onChange={v => setShipping({...shipping, line1: v})} placeholder="Street, Locality, Apartment" />
              </div>
              <AuthInput icon={<MapPin />} label="City" value={shipping.city} onChange={v => setShipping({...shipping, city: v})} placeholder="Mumbai" />
              <AuthInput icon={<MapPin />} label="Postal Zone" value={shipping.pincode} onChange={v => setShipping({...shipping, pincode: v})} placeholder="400001" />
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10 flex flex-col items-center py-16 animate-in slide-in-from-bottom-8 duration-500">
            <h3 className="text-2xl font-serif font-bold text-slate-800">Financial Settlement</h3>
            <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
               {(['UPI', 'Card', 'Cash'] as const).map(m => (
                 <button key={m} onClick={() => setPaymentMethod(m)} className={`py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border transition-all ${paymentMethod === m ? 'bg-amber-500 border-amber-500 text-slate-900 shadow-2xl scale-105' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-amber-400'}`}>{m}</button>
               ))}
            </div>
            {paymentMethod === 'UPI' && (
              <div className="bg-white p-10 border-[14px] border-slate-900 rounded-[3.5rem] shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors" />
                <QrCode size={200} strokeWidth={1} className="relative z-10" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10"><Diamond size={70} className="text-amber-500" /></div>
              </div>
            )}
            <p className="text-xs text-slate-400 font-medium max-w-sm text-center leading-relaxed">Transaction secured with Quantum-grade encryption protocols and biometric verification.</p>
          </section>
        )}
      </div>

      {/* Checkout Sidebar Summary */}
      <div className="space-y-8">
        <section className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-slate-800 border-b-[10px] border-b-amber-500 sticky top-10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
          <div className="relative z-10 space-y-10">
            <h2 className="text-3xl font-serif font-bold">Valuation</h2>
            <div className="space-y-6">
               <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]"><span>Net Assets</span><span>₹{summary.subtotal.toLocaleString()}</span></div>
               <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]"><span>GST Levy (3%)</span><span>₹{summary.tax.toLocaleString()}</span></div>
               <div className="pt-10 border-t border-slate-800 flex justify-between items-center">
                 <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Net Payable</span>
                 <span className="text-5xl font-serif font-bold text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] font-serif">₹{summary.grandTotal.toLocaleString()}</span>
               </div>
            </div>

            {!isAdmin && (
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3 text-amber-400">
                  <Truck size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Courier Manifest</span>
                </div>
                <p className="text-xs font-bold text-slate-100">ETA: {estDeliveryDate}</p>
                <p className="text-[10px] text-slate-500 italic uppercase tracking-tighter">VIP Secure Logistics Enabled</p>
              </div>
            )}

            <button 
              onClick={step === 3 ? handleFinalize : handleNextStep} 
              disabled={cart.length === 0 || isProcessing}
              className="w-full py-7 bg-amber-500 text-slate-900 font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] hover:bg-white transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 group active:scale-95"
            >
              {isProcessing ? <Loader2 className="animate-spin" size={20} /> : (
                 <>
                    <span>{step === 3 ? 'Authorize Settlement' : 'Proceed to Logistics'}</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                 </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const HistoryPage: React.FC<{ bills: Bill[], title?: string, onViewBill: (b: Bill) => void }> = ({ bills, title = "Store Ledger", onViewBill }) => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-800">{title}</h1>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 bg-white px-6 py-4 rounded-full border border-slate-100 shadow-sm">{bills.length} Secure Archive Entries</p>
    </div>
    
    {bills.length === 0 ? (
      <div className="bg-white rounded-[3rem] p-32 text-center border border-slate-100 flex flex-col items-center shadow-sm">
        <History size={80} className="text-slate-100 mb-8" />
        <p className="text-slate-400 font-medium text-xl italic tracking-tight">The archival records are currently void.</p>
      </div>
    ) : (
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Serial #</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Manifest Date</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Consignee</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">valuation</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bills.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-all duration-500 group cursor-pointer" onClick={() => onViewBill(b)}>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                       <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-500"></div>
                       <span className="font-mono text-sm font-black text-slate-900 tracking-tighter">{b.id}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm text-slate-800 font-bold">{new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-0.5">{new Date(b.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm text-slate-800 font-bold">{b.customerName}</p>
                    <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase font-black opacity-60 mt-0.5">{b.paymentMethod} Settle</p>
                  </td>
                  <td className="px-10 py-8 text-right font-black text-slate-900 font-serif text-2xl">
                    ₹{b.grandTotal.toLocaleString()}
                  </td>
                  <td className="px-10 py-8 text-center">
                    <button className="inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-amber-500 group-hover:text-slate-900 transition-all shadow-xl">
                      <ExternalLink size={16} /> Audit Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);

const AnalyticsPage: React.FC<{ bills: Bill[] }> = ({ bills }) => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  const stats = useMemo(() => {
    const now = new Date();
    const filtered = bills.filter(b => {
      const bDate = new Date(b.date);
      if (period === 'daily') return bDate.toDateString() === now.toDateString();
      if (period === 'weekly') {
        const diff = now.getTime() - bDate.getTime();
        return diff <= 7 * 24 * 60 * 60 * 1000;
      }
      if (period === 'monthly') return bDate.getMonth() === now.getMonth() && bDate.getFullYear() === now.getFullYear();
      if (period === 'yearly') return bDate.getFullYear() === now.getFullYear();
      return true;
    });

    const rev = filtered.reduce((s, b) => s + b.grandTotal, 0);
    const goldSales = filtered.reduce((s, b) => s + b.items.length, 0); 
    return { 
      revenue: rev, 
      count: filtered.length, 
      atv: filtered.length ? rev / filtered.length : 0,
      itemsSold: goldSales
    };
  }, [bills, period]);

  return (
    <div className="space-y-16 animate-in fade-in duration-700 py-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-slate-800">Store Intelligence</h1>
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.4em]">Operational Metrics • Real-time Vault Sync</p>
        </div>
        
        <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100 flex gap-1.5">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(p => (
            <button 
              key={p} 
              onClick={() => setPeriod(p)} 
              className={`px-7 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${period === p ? 'bg-slate-900 text-white shadow-2xl scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Manifest Volume" value={`₹${stats.revenue.toLocaleString()}`} icon={<IndianRupee />} subValue={`${stats.count} Transactions`} color="amber" flash />
        <StatCard label="Unit Velocity" value={stats.itemsSold.toString()} icon={<Zap />} subValue="Jewelry Pieces Dispatched" color="green" />
        <StatCard label="Mean Transaction" value={`₹${stats.atv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} icon={<TrendingUp />} subValue="Avg Value Per Settlement" color="slate" />
        <StatCard label="Levy Accumulation" value={`₹${(stats.revenue * 0.03).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} icon={<BarChart3 />} subValue="Accumulated GST (3%)" color="slate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden group border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-[4s]" />
          <div className="relative z-10 space-y-12">
             <div className="flex justify-between items-center">
                <div className="space-y-1">
                   <h3 className="text-3xl font-serif font-bold">Growth trajectory</h3>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">7-Day Transaction Flux</p>
                </div>
                <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20"><Layers className="text-amber-500" size={28} /></div>
             </div>
             <div className="flex items-end gap-8 h-60">
                {[45, 80, 55, 95, 75, 90, 65].map((h, i) => (
                   <div key={i} className="flex-1 bg-white/5 rounded-t-2xl relative group/bar hover:bg-amber-500/10 transition-all cursor-crosshair overflow-hidden" style={{ height: `${h}%` }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-amber-500 h-0 group-hover/bar:h-full transition-all duration-1000 opacity-30" />
                      <div className="absolute top-2 left-0 right-0 text-center opacity-0 group-hover/bar:opacity-100 transition-opacity text-[8px] font-black">{h}%</div>
                   </div>
                ))}
             </div>
             <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 px-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm space-y-10 group hover:border-amber-100 transition-colors duration-500">
           <div className="space-y-1">
              <h3 className="text-3xl font-serif font-bold text-slate-800">Operational Health</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Vault Protocol Audit</p>
           </div>
           <div className="space-y-8">
              <HealthItem label="Transaction Integrity" percentage={98.4} />
              <HealthItem label="Courier Efficiency" percentage={95.2} />
              <HealthItem label="Customer Sentiment" percentage={99.1} />
           </div>
           <div className="pt-10 flex items-center gap-5 border-t border-slate-50">
              <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 flex items-center justify-center text-amber-600 group-hover:rotate-12 transition-transform duration-500 shadow-sm"><ShieldCheck size={32} /></div>
              <div className="space-y-1">
                 <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Security Pulse</p>
                 <p className="text-base font-bold text-slate-800">Quantum Vault Active</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const HealthItem: React.FC<{ label: string, percentage: number }> = ({ label, percentage }) => (
  <div className="space-y-3">
     <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em]">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-900 font-mono">{percentage}%</span>
     </div>
     <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
        <div className="h-full bg-slate-900 rounded-full animate-pulse-slow relative" style={{ width: `${percentage}%` }}>
           <div className="absolute top-0 right-0 h-full w-4 bg-amber-500 opacity-40 blur-sm" />
        </div>
     </div>
  </div>
);

const StatCard: React.FC<{ label: string, value: string, icon: React.ReactNode, subValue: string, color: 'amber' | 'slate' | 'green', flash?: boolean }> = ({ label, value, icon, subValue, color, flash }) => (
  <div className={`bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group ${flash ? 'border-b-[10px] border-b-amber-500' : ''}`}>
    <div className={`p-5 rounded-2xl inline-block mb-8 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg ${color === 'amber' ? 'bg-amber-100 text-amber-600 shadow-amber-500/10' : color === 'green' ? 'bg-green-100 text-green-600 shadow-green-500/10' : 'bg-slate-100 text-slate-600 shadow-slate-500/10'}`}>
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 30 }) : icon}
    </div>
    <div className="space-y-1">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{label}</p>
      <h4 className="text-4xl font-serif font-bold text-slate-900 mb-3 tracking-tight font-serif">{value}</h4>
      <p className="text-[12px] text-slate-500 font-medium tracking-tight italic opacity-80">{subValue}</p>
    </div>
  </div>
);

export default App;
