import React, { useState } from "react";
import { FiMapPin, FiEdit3, FiPlus } from "react-icons/fi";
import { useAddressContext } from "../../../context/AddressContext";
import AddressForm from "./AddressForm";

const Address = () => {
  const { savedAddresses, selectedAddress, setSelectedAddress, updateAddress } =
    useAddressContext();
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiMapPin className="text-stone-400" />
          <h2 className="text-xs font-black uppercase tracking-[0.3em]">
            Shipping Destination
          </h2>
        </div>

        {/* Toggle Button */}
        {!isAddressFormOpen && savedAddresses && (
          <button
            onClick={() => setIsAddressFormOpen(true)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-800 hover:text-black transition-colors"
          >
            <FiEdit3 /> Change Address
          </button>
        )}
      </div>

      {!isAddressFormOpen && savedAddresses ? (
        /* --- ADDRESS BOX DISPLAY --- */
        <div className="flex flex-col gap-5">
          {savedAddresses.map((addr, i) => (
            <div
              onClick={(e) => {
                setSelectedAddress(addr);
                updateAddress(e, addr._id);
              }}
              key={i}
              className={`group relative flex items-center gap-6 p-6 transition-all duration-500 cursor-pointer rounded-3xl border-2 
          ${
            selectedAddress._id === addr._id
              ? "bg-emerald-50/50 border-emerald-800 shadow-md"
              : "bg-white border-stone-100 hover:bg-emerald-50/50 hover:border-emerald-800"
          }`}
            >
              {/* --- LEFT: ICON ZONE --- */}
              <div
                className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 
          ${selectedAddress._id === addr._id ? "bg-emerald-800 text-white" : "bg-stone-100 text-stone-400 group-hover:bg-emerald-800 group-hover:text-white"}`}
              >
                <FiMapPin size={24} />
              </div>

              {/* --- CENTER: DETAILS --- */}
              <div className="grow space-y-1">
                <div className="flex items-center gap-3">
                  <p className="font-serif text-lg italic text-[#1A1A1A]">
                    {addr.name}
                  </p>
                  {selectedAddress._id === addr._id && (
                    <span className="px-2 py-0.5 bg-emerald-800 text-white text-[8px] font-black uppercase tracking-widest rounded-md">
                      Selected
                    </span>
                  )}
                  {addr.isDefault && !selectedAddress._id === addr._id && (
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-400 text-[8px] font-black uppercase tracking-widest rounded-md">
                      Default
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center text-[14px] text-stone-500 gap-x-2 gap-y-1">
                  <p>{addr.streetAddress}</p>
                  <span className="text-stone-300">•</span>
                  <p>
                    {addr.city}, {addr.state}, {addr.postalCode}
                  </p>
                </div>

                <p className="text-[14px] text-stone-400 font-medium tracking-tight">
                  {`Contact:  ${addr.phone}`}
                  <span className="text-stone-600 font-mono"></span>
                </p>
              </div>

              {/* Selection Checkmark */}
              {selectedAddress._id === addr._id && (
                <div className="absolute -top-2 -right-2 bg-emerald-800 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* --- ADDRESS FORM --- */
        <AddressForm setIsAddressFormOpen={setIsAddressFormOpen} />
      )}
    </section>
  );
};

export default Address;
