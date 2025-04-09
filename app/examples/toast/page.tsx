"use client"

import React from 'react';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function ToastExample() {
  return (
    <Card className="max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Test dei componenti UI</h2>
      <Textarea placeholder="Scrivi qualcosa..." className="mb-4" />
      <Button>Invia</Button>
    </Card>
  )
} 