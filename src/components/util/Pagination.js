import React from 'react';
import { Pagination as GeistPagination } from '@geist-ui/react';

import makeStyles from '../../util/makeStyles';

const useStyles = makeStyles((ui) => ({
    pagination: {
        padding: '8px 0',
        display: 'flex',
        justifyContent: 'center',
    },
}));

const Pagination = ({ page = 1, count = 1, initialPage = 1, limit = 7, onChange }) => {
    const { pagination } = useStyles();

    return (
        <section className={pagination}>
            <GeistPagination
                page={page}
                count={count}
                initialPage={initialPage}
                limit={limit}
                onChange={onChange}
            />
        </section>
    );
};

export default Pagination;
