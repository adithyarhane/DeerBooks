import React from "react";
import { useState } from "react";
import { useAddressContext } from "../../../context/AddressContext";

const AddressForm = ({ setIsAddressFormOpen }) => {
  const { savedAddresses, addAddress } = useAddressContext();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <form
        onSubmit={(e) => {
          addAddress(e, address);
          setIsAddressFormOpen(false);
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-4">
            Full Name
          </label>
          <input
            defaultValue={address.name}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            type="text"
            placeholder="Julian Thorne"
            className="w-full bg-white/50 border border-stone-200 rounded-full px-6 py-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-800 transition-all"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-4">
            Phone Number
          </label>
          <input
            defaultValue={address.phone}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            type="text"
            placeholder="+919000341233"
            className="w-full bg-white/50 border border-stone-200 rounded-full px-6 py-4 focus:bg-white focus:outline-none transition-all"
            required
          />
        </div>

        {/* Street Address */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-4">
            Street Address
          </label>
          <input
            defaultValue={address.street_address}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                street_address: e.target.value,
              }))
            }
            type="text"
            placeholder="42 Bibliophile Lane"
            className="w-full bg-white/50 border border-stone-200 rounded-full px-6 py-4 focus:bg-white focus:outline-none transition-all"
            required
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-4">
            City
          </label>
          <input
            defaultValue={address.city}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            type="text"
            placeholder="Mumbai"
            className="w-full bg-white/50 border border-stone-200 rounded-full px-6 py-4 focus:bg-white focus:outline-none transition-all"
            required
          />
        </div>

        {/* State - NEW INPUT */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-4">
            State
          </label>
          <input
            defaultValue={address.state}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                state: e.target.value,
              }))
            }
            type="text"
            placeholder="Maharashtra"
            className="w-full bg-white/50 border border-stone-200 rounded-full px-6 py-4 focus:bg-white focus:outline-none transition-all"
            required
          />
        </div>

        {/* Postcode */}
        <div className="space-y-2 md:col-span-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-4">
            Postcode
          </label>
          <input
            defaultValue={address.postal_code}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                postal_code: e.target.value,
              }))
            }
            type="text"
            placeholder="400001"
            className="w-full bg-white/50 border border-stone-200 rounded-full px-6 py-4 focus:bg-white focus:outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-4">
            Country
          </label>
          <input
            defaultValue={address.country}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                country: e.target.value,
              }))
            }
            type="text"
            placeholder="India"
            className="w-full bg-white/50 border border-stone-200 rounded-full px-6 py-4 focus:bg-white focus:outline-none transition-all"
            required
          />
        </div>

        {/* Action Buttons for Form */}
        <div className="flex gap-4 pl-4">
          <button
            type="submit"
            className="px-8 py-3 bg-emerald-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
          >
            Save Destination
          </button>
          {savedAddresses && (
            <button
              onClick={() => setIsAddressFormOpen(false)}
              className="px-8 py-3 text-stone-400 text-[10px] font-black uppercase tracking-widest hover:text-black transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
