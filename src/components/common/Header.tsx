import React from 'react';

// Define the types for props
interface HeaderProps {
  title: string;
  onTitleChange?: (newTitle: string) => void; // Optional callback function
}

const Header: React.FC<HeaderProps> = ({ title, onTitleChange }) => {
  return (
    <div className="Header">
      <h1>{title}</h1>
      {/* Button removed */}
    </div>
  );
};

export default Header;
