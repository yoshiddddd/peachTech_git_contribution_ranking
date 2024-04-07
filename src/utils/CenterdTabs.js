import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../css/CenterdTabs.css'
const StyledPaper = styled(Paper)({
  flexGrow: 1,
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: { // 600px以下のデバイスに適用
    '& .MuiTabs-flexContainer': {
      flexDirection: 'column', // タブを縦に並べる
    },
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%', // タブの幅を100%にする
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const CenteredTabs = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <StyledPaper>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {props.labels.map((label, index) => <StyledTab key={index} label={label} className='StyledTab' />)} 
        </StyledTabs>
      </StyledPaper>

      {props.children.map((child, index) => 
        <TabPanel key={index} value={value} index={index}>{child}</TabPanel>)
      }
    </div>
  );
};

export default CenteredTabs;
