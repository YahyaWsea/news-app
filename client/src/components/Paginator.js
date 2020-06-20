import React from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';


function Pagination(props) {
    const { page, pageSize } = props;
    const handlePagination = (page, pageSize) => {
        page = page
    }
    const handlePageSizeChange = (current, size) => {
        pageSize = size
        setPage(1);
    }



    return (
        <Pagination
            current={page}
            onChange={handlePagination}
            defaultCurrent={1}
            total={100}
            pageSize={pageSize}
            showSizeChanger
            pageSizeOptions={['20', '30', '40']}
            onShowSizeChange={handlePageSizeChange}
        />

    )
}

export default Pagination
