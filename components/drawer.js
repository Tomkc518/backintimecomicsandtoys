import Drawer from '@mui/material/Drawer';
import TagFilter from './tagFilter';
import { useState } from 'react';

const DrawerComponent = (props) => {
    const [openDrawer, setOpenDrawer] = useState(true);

    return (
        <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        >
        </Drawer>
      )
}

export default DrawerComponent