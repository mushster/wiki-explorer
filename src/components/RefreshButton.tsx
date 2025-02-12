'use client'

import React from 'react';
import { Button } from '@/components/ui/button';

export default function RefreshButton() {
  return (
    <Button onClick={() => window.location.reload()}>
      Get New Articles
    </Button>
  );
} 