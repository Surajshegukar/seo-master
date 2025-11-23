"use client";
import ComponentCard from '@/src/components/admin/common/ComponentCard';
import React from 'react';
import UserTable from './user-table';


export default function UserList() {

  return (
    <ComponentCard title="User List">
       <div>
            <UserTable />
       </div>
    </ComponentCard>
  );
}
