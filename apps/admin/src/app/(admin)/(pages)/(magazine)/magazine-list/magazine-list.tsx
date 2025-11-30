"use client";
import ComponentCard from '@/src/components/admin/common/ComponentCard';
import React from 'react';
import MagazineTable from './magazine-table';


export default function MagazineList() {

  return (
    <ComponentCard title="Magazine List">
       <div>
            <MagazineTable />
       </div>
    </ComponentCard>
  );
}
