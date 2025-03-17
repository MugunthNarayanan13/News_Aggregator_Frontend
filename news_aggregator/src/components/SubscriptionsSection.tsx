/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Plus, Bell } from 'lucide-react';

interface SubscriptionProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  newsNotifications?: Array<{
    name: string;
    logo: string;
  }>;
}

const NewspaperSubscription = ({ 
  name, 
  logo, 
  isActive = true,
  isNotificationEnabled = false,
  onToggleStatus,
  onToggleNotification
}: { 
  name: string; 
  logo: string; 
  isActive?: boolean;
  isNotificationEnabled?: boolean;
  onToggleStatus: () => void;
  onToggleNotification: () => void;
}) => (
  <div className={`relative border rounded-lg p-6 transition-all ${
    isActive ? 'border-green-500 bg-green-50 bg-opacity-30' : 'border-gray-200 bg-gray-50'
  }`}>
    {isActive && (
      <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full px-2 py-1 text-xs">
        Active
      </div>
    )}
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-4">
        <Newspaper size={24} className="text-gray-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
      <button 
        onClick={onToggleNotification}
        className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 mr-2"
        title={isNotificationEnabled ? "Disable notifications" : "Enable notifications"}
      >
        <Bell 
          size={20} 
          className={isNotificationEnabled ? "text-yellow-500 fill-yellow-500" : "text-gray-400"} 
        />
      </button>
    </div>
    <div className="flex space-x-2">
      <button 
        onClick={() => window.open(`https://${name.toLowerCase().replace(/\s+/g, '')}.com`, '_blank')}
        className="flex items-center text-sm text-primary hover:text-primary-dark"
      >
        <ExternalLink size={14} className="mr-1" /> Manage on website
      </button>
      {isActive ? (
        <button 
          onClick={onToggleStatus}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800 ml-auto"
        >
          Mark as inactive
        </button>
      ) : (
        <button 
          onClick={onToggleStatus}
          className="flex items-center text-sm text-green-600 hover:text-green-800 ml-auto"
        >
          Mark as active
        </button>
      )}
    </div>
  </div>
);

const ExploreSuggestion = ({ 
  name, 
  logo, 
  description,
  onTrack
}: { 
  name: string; 
  logo: string; 
  description: string;
  onTrack: () => void;
}) => (
  <div className="border rounded-lg p-6 transition-all hover:shadow-md">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-4">
        <Newspaper size={24} className="text-gray-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="flex space-x-2">
      <button
        onClick={() => window.open(`https://${name.toLowerCase().replace(/\s+/g, '')}.com`, '_blank')}
        className="py-2 px-4 rounded-md border border-primary text-primary hover:bg-primary-50 transition-colors flex-1"
      >
        Subscribe on site
      </button>
      <button
        onClick={onTrack}
        className="py-2 px-4 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors flex items-center justify-center flex-1"
      >
        <Plus size={16} className="mr-2" /> Track
      </button>
    </div>
  </div>
);

export default function SubscriptionsSection({ user, setUser, newsNotifications = [] }: SubscriptionProps) {
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock data for newspaper subscriptions
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 'nyt',
      name: 'New York Times',
      logo: 'nyt-logo',
      isActive: true,
      isNotificationEnabled: false
    },
    {
      id: 'wsj',
      name: 'Wall Street Journal',
      logo: 'wsj-logo',
      isActive: true,
      isNotificationEnabled: false
    },
    {
      id: 'wapo',
      name: 'Washington Post',
      logo: 'wapo-logo',
      isActive: false,
      isNotificationEnabled: false
    }
  ]);

  // Update subscription notification status from newsNotifications prop
  useEffect(() => {
    if (newsNotifications && newsNotifications.length > 0) {
      const notificationMap = new Map(
        newsNotifications.map(notification => [notification.name, true])
      );
      
      setSubscriptions(currentSubscriptions =>
        currentSubscriptions.map(sub => ({
          ...sub,
          isNotificationEnabled: notificationMap.has(sub.name)
        }))
      );
    }
  }, [newsNotifications]);

  // Suggestions for new subscriptions
  const suggestions = [
    {
      id: 'economist',
      name: 'The Economist',
      logo: 'economist-logo',
      description: 'In-depth analysis on international business, politics, and economics.'
    },
    {
      id: 'guardian',
      name: 'The Guardian',
      logo: 'guardian-logo',
      description: 'Breaking news, sports, opinion and more from one of the UK\'s leading news providers.'
    },
    {
      id: 'ft',
      name: 'Financial Times',
      logo: 'ft-logo',
      description: 'World business, finance and political news from the Financial Times.'
    }
  ];
  
  const handleToggleSubscriptionStatus = async (id: string) => {
    setIsProcessing(true);
    
    try {
      // Update subscriptions state
      setSubscriptions(subscriptions.map(sub => 
        sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
      ));
      
      console.log(`Toggled status for ${id}`);
    } catch (error) {
      console.error("Failed to update subscription status", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleTrackNewSubscription = async (id: string) => {
    setIsProcessing(true);
    
    try {
      // Add new subscription to list
      const newSub = suggestions.find(s => s.id === id);
      if (newSub) {
        setSubscriptions([...subscriptions, {
          id: newSub.id,
          name: newSub.name,
          logo: newSub.logo,
          isActive: true,
          isNotificationEnabled: false
        }]);
      }
      
      console.log(`Started tracking subscription to ${id}`);
    } catch (error) {
      console.error("Failed to track subscription", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleToggleNotification = async (id: string) => {
    setIsProcessing(true);
    
    try {
      // Get the subscription
      const subscription = subscriptions.find(sub => sub.id === id);
      if (!subscription) return;
      
      // Toggle notification status
      const newNotificationStatus = !subscription.isNotificationEnabled;
      
      // Update subscriptions state
      setSubscriptions(subscriptions.map(sub => 
        sub.id === id ? { ...sub, isNotificationEnabled: newNotificationStatus } : sub
      ));
      
      console.log(`${newNotificationStatus ? 'Enabled' : 'Disabled'} notifications for ${subscription.name}`);
    } catch (error) {
      console.error("Failed to update notification settings", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === 'subscriptions'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          My Subscriptions
        </button>
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === 'explore'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Explore
        </button>
      </div>
      
      {activeTab === 'subscriptions' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Newspaper Subscriptions</h2>
            <p className="text-sm text-gray-500">Track and manage your subscriptions in one place</p>
          </div>
          
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6">
            <p className="text-sm">
              <strong>Note:</strong> This platform helps you track your subscriptions. 
              To manage billing or cancel a subscription, please visit the newspaper's website directly.
            </p>
          </div>
          
          {subscriptions.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Newspaper size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No subscriptions yet</h3>
              <p className="text-gray-500 mb-4">You haven't added any news sources to track yet.</p>
              <button 
                onClick={() => setActiveTab('explore')}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Explore News Sources
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {subscriptions.map(sub => (
                <NewspaperSubscription
                  key={sub.id}
                  name={sub.name}
                  logo={sub.logo}
                  isActive={sub.isActive}
                  isNotificationEnabled={sub.isNotificationEnabled}
                  onToggleStatus={() => handleToggleSubscriptionStatus(sub.id)}
                  onToggleNotification={() => handleToggleNotification(sub.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      {activeTab === 'explore' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Explore News Sources</h2>
            <p className="text-sm text-gray-500">Discover quality journalism</p>
          </div>
          
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6">
            <p className="text-sm">
              <strong>Note:</strong> To subscribe, you'll be directed to the news source's website. 
              After subscribing, return here to track your subscription.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {suggestions.map(suggestion => (
              <ExploreSuggestion
                key={suggestion.id}
                name={suggestion.name}
                logo={suggestion.logo}
                description={suggestion.description}
                onTrack={() => handleTrackNewSubscription(suggestion.id)}
              />
            ))}
          </div>
          
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Looking for specific news sources?</h3>
            <p className="text-sm text-gray-600 mb-3">
              We partner with hundreds of newspapers and magazines. Contact us if you can't find what you're looking for.
            </p>
            <button className="text-primary hover:text-primary-dark font-medium text-sm">
              Contact Support →
            </button>
          </div>
        </>
      )}
    </div>
  );
}