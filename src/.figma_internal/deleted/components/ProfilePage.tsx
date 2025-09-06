import React, { useState } from 'react';
import { User, Mail, Edit3, Save, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User as UserType } from '../App';

interface ProfilePageProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
}

export function ProfilePage({ user, onUpdateUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    if (!editedUser.username.trim() || !editedUser.email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    onUpdateUser(editedUser);
    localStorage.setItem('ecofinds-user', JSON.stringify(editedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <Card className="shadow-sm border border-gray-100 mb-6">
        <CardHeader className="text-center pb-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-green-500 text-white text-2xl">
                {getInitials(user.username)}
              </AvatarFallback>
            </Avatar>
            {!isEditing && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isEditing ? (
            /* View Mode */
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <Label className="text-sm text-gray-600">Username</Label>
                  <p className="font-medium text-gray-900">{user.username}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <Label className="text-sm text-gray-600">Email</Label>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </Button>
            </div>
          ) : (
            /* Edit Mode */
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                  placeholder="Enter your username"
                  className="rounded-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  placeholder="Enter your email"
                  className="rounded-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card className="shadow-sm border border-gray-100 mb-6">
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-green-700">Items Sold</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-sm text-blue-700">Items Bought</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-1">Data Privacy</h4>
            <p className="text-sm text-yellow-700">
              Your data is stored locally in your browser. We respect your privacy and don't collect personal information.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-1">Sustainable Impact</h4>
            <p className="text-sm text-green-700">
              Thank you for choosing EcoFinds and contributing to a more sustainable future through second-hand shopping!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}