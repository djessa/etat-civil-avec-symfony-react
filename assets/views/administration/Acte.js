import { IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import AdministrationLayout from '../../layouts/AdministrationLayout'
import { WEBROOT } from '../../uses/const'

export default function Acte() {
    return <AdministrationLayout>
        <table className="table table-primary text-center" style={{ width: '96%', margin: 'auto' }}>
            <thead>
                <tr><th>ID</th><th>Catégorie</th><th>Action</th></tr>
            </thead>
            <tbody>

            </tbody>
        </table>
        <div className="m-3 float-right">
            <IconButton component={Link} to={WEBROOT + 'administration/acte_new'} fab="true" color="primary" size="small" style={{ background: 'blue', color: 'white' }} >
                <Add />
            </IconButton>
        </div>
    </AdministrationLayout>
}