import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function PageTitle({ title = '' }) {
        return (
                <HelmetProvider>
                        <Helmet>
                                <title>FF UNISSULA - {title}</title>
                        </Helmet>
                </HelmetProvider>
        )
}
