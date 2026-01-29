import CategoryList from '@/componets/category/CategoryList';
import { userService } from '@/service/user.service';
import React from 'react';

const page = async () => {
    const {data,error}=await userService.getAllCategory()
    return (
        <div>
          <CategoryList data={data.data}/>
            
        </div>
    );
};

export default page;