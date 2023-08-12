import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchWidget = () => {
    return (
        <div className='w-full my-[12px]'>
            <div className='flex items-center rounded-[30px] relative'>
                <input type='text' placeholder='搜索' className='w-full h-[48px] pl-[48px] outline-none border border-transparent rounded-[30px] text-[15px] text-mernFont bg-mernBgLight transition-all placeholder:text-mernLightGray focus:border-mernBlue focus:bg-white focus-next-svg:!text-mernBlue' />
                <SearchOutlinedIcon className='absolute z-[10] left-[16px]'/>
            </div>
        </div>
    )
}

export default SearchWidget