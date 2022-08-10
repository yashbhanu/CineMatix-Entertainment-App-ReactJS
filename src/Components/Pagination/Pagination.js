import { Pagination } from '@material-ui/lab'
import React from 'react'

const customPagination = ({setPage, numOfPages = 10}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }

  return (
    <div style = {{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,

    }}>
        <Pagination
        count = {numOfPages}
        onChange = {(e) => handlePageChange(e.target.textContent)} 
        hidePrevButton 
        hideNextButton
        color='secondary' />
    </div>
  )
}

export default customPagination