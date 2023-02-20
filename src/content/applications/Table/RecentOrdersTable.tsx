import { FC, ChangeEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import socketIOClient  from "socket.io-client";
import { useSocket } from 'src/contexts/SocketProvider';
import { User } from 'src/types/socketio';
import  { successAlert }  from 'src/components/ToastGroup';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}


const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  
  const [message, setMessage] = useState("");
  // const socket = socketClient (SERVER);
  const [response, setResponse] = useState("");


  const theme = useTheme();


  const { socket, gameData } = useSocket();

  const [currentPlayers, setCurrentPlayers] = useState<any[]>([]);
  const [forceFlag, setForceFlag] = useState(false)
  
  console.log("Transaction is confirmed!")

  // if (gameData) {
  //   // for (let i = 0; i < gameData.users.length; i ++)
  //   // {

  //   // }
  //   let i = gameData.users.length
  //   const alert = gameData.users[0]
  //   console.log("alert>>>>" , alert)
  //   successAlert(alert.toString())
  // }

  useEffect(() => {
    console.log(gameData, "-- game data")
    if (gameData) {
      setCurrentPlayers(gameData.users);
      console.log("    here>>>>", gameData.users)
     
      setForceFlag(forceFlag)
      setTimeout(() => {
        console.log("state ", currentPlayers)
      }, 1000);
      
    }
 
  }, [gameData])
  if (currentPlayers) {
    console.log("    ok>>>>", currentPlayers[1])
    // currentPlayers.map((currentPlayer, index) => {
    //   successAlert(currentPlayer[0])
    // })
    const temp = currentPlayers[1]

    const alert = temp.toString()

    console.log("    alert>>>>", alert)
    successAlert(alert)

  }
  return (
    <Card>
      
     
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell> */}
              <TableCell>Date Placed</TableCell>
              <TableCell>Ticket</TableCell>
              <TableCell>WagerType/Game Date/Sports/Description</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Risk/Win</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            
            {currentPlayers.map((currentPlayer, index) => {
              successAlert(currentPlayer)
              return (
              <TableRow
                  
                  key={index}
                >                 
                       <TableCell >                 
                   {currentPlayer[0]}                
                  </TableCell>
             <TableCell>                   
                    {currentPlayer[1]}                    
                  </TableCell>                   
                  <TableCell>                    
                      {currentPlayer[2]}                    
                  </TableCell>
                 <TableCell>                   
                    {currentPlayer[3]}                    
                  </TableCell>
                  <TableCell align="right">                  
                      {currentPlayer[5]}               
                  </TableCell>
               
                </TableRow>
                        )
})}      
          </TableBody>
        </Table>
      </TableContainer>
     
    </Card>
  );
};

// RecentOrdersTable.propTypes = {
//   cryptoOrders: PropTypes.array.isRequired
// };

// RecentOrdersTable.defaultProps = {
//   cryptoOrders: []
// };

export default RecentOrdersTable;
