'use client';

import React, { useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState 
      title="It seems like something has gone terribly wrong! :o"
    />
  )
};  

export default ErrorState;