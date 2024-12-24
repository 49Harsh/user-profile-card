import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from './ui/LoadingSpinner';
import { fetchUserData } from '../api/userApi';

const UserProfileCard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading user data:', error);
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Container with top margin */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Background Effects */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/20">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Profile Image Section */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 mx-auto md:mx-0 w-40 sm:w-48 md:w-56"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-500 p-1">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      src={user.picture.large}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center mt-4 space-x-3">
                    {['Github', 'Twitter', 'Linkedin'].map((platform) => (
                      <motion.button
                        key={platform}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-teal-600 hover:bg-white transition-colors"
                      >
                        {platform === 'Github' && <Github size={16} />}
                        {platform === 'Twitter' && <Twitter size={16} />}
                        {platform === 'Linkedin' && <Linkedin size={16} />}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* User Information Section */}
                <div className="flex-grow space-y-6">
                  {/* Name and Title */}
                  <div className="text-center md:text-left space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {user.name.first} {user.name.last}
                    </h2>
                    <p className="text-lg text-emerald-200">
                      {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    {[
                      { Icon: Phone, value: user.phone, label: 'Phone' },
                      { Icon: Mail, value: user.email, label: 'Email' },
                      { Icon: MapPin, value: `${user.location.city}, ${user.location.country}`, label: 'Location' }
                    ].map(({ Icon, value, label }, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-emerald-300" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-emerald-200">{label}</span>
                          <span className="text-white">{value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors"
                    >
                      Message
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 border border-emerald-400 text-emerald-400 rounded-xl font-medium hover:bg-emerald-400/10 transition-colors"
                    >
                      Follow
                    </motion.button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default UserProfileCard;