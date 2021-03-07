import React, { useEffect, useRef, useState } from 'react';
import { CryptoData } from '../../Cryptos';
import { Icon as CryptoIcon } from 'coinmarketcap-cryptocurrency-icons';
import styled from 'styled-components';
// @ts-ignore
import bgImage from '../../../../assets/bg_circle1.svg';
import EditIcon from '../../../icons/EditIcon';
import CryptoInAssetEditForm from './CryptoInAssetEditForm';
import DeleteIcon from '../../../icons/DeleteIcon';
import CancelIcon from '../../../icons/CancelIcon';
import { useAuthState } from '../../../../context/authContext';
import { Asset, useAssetDispatch } from '../../../../context/assetContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Icon, InlineIcon } from '@iconify/react';
import squareEditOutline from '@iconify/icons-mdi/square-edit-outline';
import deleteOutline from '@iconify/icons-mdi/delete-outline';

interface CryptoProps {
  crypto: CryptoData;
  animate?: string;
  asset?: Asset;
}

interface StyledLiProps {
  bgImage?: string;
}

const StyledLi = styled.li<StyledLiProps>`
  background: ${(props) => `url('${props.bgImage}')`};
  background-size: cover;
`;

const CryptoInAsset = React.memo<CryptoProps>(({ crypto, asset }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const { firstCurrency, name, price } = crypto;
  const inputReference = useRef<HTMLInputElement>(null);
  const { token } = useAuthState();
  const { setAssets } = useAssetDispatch();

  const handleToggleEdit = () => {
    setIsEditVisible((prevState) => !prevState);
  };

  const handleOpenConfirmModal = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        setTimeout(() => {
          onClose();
        }, 1000);
        return (
          <div className="w-96 h-64 bg-black text-white p-4 flex flex-col items-center justify-center rounded-md">
            <h3 className="text-xl">{firstCurrency} was removed</h3>
          </div>
        );
      },
    });
  };

  const handleOpenDeleteModal = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="w-96 h-64 bg-black text-white p-4 flex flex-col items-center rounded-md">
            <h3 className="text-xl mt-8">Are you sure?</h3>
            <div className="h-full flex flex-col justify-center">
              <p className="mb-10 text-center">
                You want to remove <span>{firstCurrency}</span> from your wallet?
              </p>
              <div className="flex w-1/2 self-end">
                <button className="mr-2 border border-white px-6 py-2" onClick={onClose}>
                  <span className="p2">No</span>
                </button>
                <button
                  className="mr-2 border border-white px-6 py-2"
                  onClick={async () => {
                    await handleDelete();
                    handleOpenConfirmModal();
                  }}
                >
                  <span className="p2">Yes</span>
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  const handleDelete = async () => {
    if (token && asset) {
      const payload = { id: asset.id };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };
      await fetch(`http://localhost:3001/api/assets`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(payload),
      });
      setAssets((prevState) => prevState.filter((item) => item.id !== asset.id));
    }
  };

  useEffect(() => {
    if (isEditVisible) {
      inputReference.current?.focus();
    }
  }, [isEditVisible]);

  if (asset?.amount) {
    return (
      <li className="w-full h-24 bg-gray-900 flex items-center justify-between my-2 bg-transparent rounded-md px-4">
        <div className="flex items-center w-4/5 justify-between">
          <div className="flex items-center">
            <CryptoIcon i={firstCurrency.toLowerCase()} size={64} />
            <h3 className="md:text-lg text-white ml-4">
              {name} <span className="text-md font-bold text-white">({firstCurrency})</span>
            </h3>
            <span className="text-white  md:text-4xl md:ml-12 font-mono">{asset.amount}</span>
          </div>

          <span className="ml-4 md:text-4xl font-mono">
            {parseFloat((asset?.amount * parseFloat(price)).toPrecision(5))} PLN
          </span>
        </div>
        <div className="flex">
          <div className="text-gray-300 text-2xl sm:text-4xl md:text-6xl md:mr-4">
            <Icon icon={squareEditOutline} />
          </div>
          <div className="text-gray-300 text-2xl sm:text-4xl md:text-6xl">
            <Icon icon={deleteOutline} />
          </div>
        </div>
      </li>
      // <StyledLi
      //   className="group my-10 sm:m-10 w-full sm:w-80 h-80 rounded-md relative flex flex-col items-center border border-gray-600 hover:border-gray-200 z-10 font-mono font-thin"
      //   bgImage={bgImage}
      // >
      //   {!isEditVisible ? (
      //     <>
      //       <button
      //         className="flex absolute -top-8 left-8  sm:-top-8 sm:-left-8 w-16 h-16 z-20 bg-white rounded-full transform opacity-0 group-hover:opacity-100 duration-1000 group-hover:scale-110  justify-center items-center"
      //         onClick={handleToggleEdit}
      //       >
      //         <EditIcon />
      //       </button>
      //       <div className="absolute -top-8 left-8  sm:-top-8 sm:-left-8 z-10 transform group-hover:scale-110 duration-1000 group-hover:opacity-0">
      //         <Icon i={firstCurrency.toLowerCase()} size={64} />
      //       </div>
      //     </>
      //   ) : (
      //     <div className="absolute -top-8 left-8  sm:-top-8 sm:-left-8 z-10 bg-gray-900 w-16 h-16 rounded-full">
      //       <div className="relative w-full h-full flex justify-center items-center">
      //         <button
      //           className="absolute top-2 left-2 mr-4"
      //           onClick={handleToggleEdit}
      //           title="Cancel"
      //         >
      //           <CancelIcon />
      //         </button>
      //         <span className="text-white text-xs">/</span>
      //         <button
      //           className="absolute bottom-2 right-2 ml-4"
      //           onClick={handleOpenDeleteModal}
      //           title="Delete"
      //         >
      //           <DeleteIcon />
      //         </button>
      //       </div>
      //     </div>
      //   )}

      //   <div className="w-full h-2/5">
      //     <div className="flex flex-col justify-center items-center bg-black bg-opacity-25 rounded-t-md h-full relative">
      //       <span className="absolute top-0 right-0 p-1 bg-white text-black">{asset.amount}</span>
      //       <span className="absolute bottom-0 right-4 text-md pt-10">{price} PLN</span>
      //       <h2 className="text-4xl font-bold text-white">{firstCurrency}</h2>
      //       <span className="text-lg text-white">{name}</span>
      //     </div>
      //   </div>
      //   <p className="text-4xl text-center my-8 p-2 bg-white text-black transform rotate-1">
      //     {parseFloat((asset?.amount * parseFloat(price)).toPrecision(5))}{' '}
      //     <span className="text-xs">PLN</span>
      //   </p>
      //   <CryptoInAssetEditForm
      //     isActive={isEditVisible}
      //     crypto={crypto}
      //     asset={asset}
      //     handleOpenDeleteModal={handleOpenDeleteModal}
      //   />
      // </StyledLi>
    );
  }
  return null;
});

export default CryptoInAsset;
