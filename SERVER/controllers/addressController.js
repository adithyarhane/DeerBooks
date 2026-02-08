import addressModel from "../models/addressModel.js";

export const addAddress = async (req, res) => {
  const userId = req.user.id;

  const {
    name,
    phone,
    streetAddress,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = req.body;

  if (
    !name ||
    !phone ||
    !streetAddress ||
    !city ||
    !state ||
    !postalCode ||
    !country
  ) {
    return res.json({
      success: false,
      message: "All fields are required.",
    });
  }
  try {
    // Find user's address
    let address = await addressModel.findOne({ user: userId });

    // If address not exists, create one
    if (!address) {
      address = new addressModel({
        user: userId,
        addresses: [],
      });
    }

    // If this address is default, unset previous default
    if (isDefault) {
      address.addresses.forEach((addr) => (addr.isDefault = false));
    }

    // Add new address
    address.addresses.push({
      name,
      phone,
      streetAddress,
      city,
      state,
      country,
      postalCode,
      isDefault: isDefault || false,
    });

    await address.save();

    return res.status(200).json({
      success: true,
      message: "Address added successfullu.",
      address: address.addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddresses = async (req, res) => {
  const userId = req.user.id;
  try {
    const addressDoc = await addressModel.findOne({ user: userId });

    return res.json({
      success: true,
      addressData: addressDoc ? addressDoc.addresses : [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  const userId = req.user.id;
  const { addressId } = req.params;
  const {
    name,
    phone,
    streetAddress,
    city,
    state,
    country,
    postalCode,
    isDefault,
  } = req.body;

  try {
    const addressDoc = await addressModel.findOne({ user: userId });

    if (!addressDoc) {
      return res.status(404).json({
        success: false,
        message: "Address record not found.",
      });
    }

    // Find the address inside array
    const address = addressDoc.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    // If setting this address as default -> unset others
    if (isDefault === true) {
      addressDoc.addresses.forEach((addr) => (addr.isDefault = false));
    }

    // update fields (only if provided)
    address.name = name ?? address.name;
    address.phone = phone ?? address.phone;
    address.streetAddress = streetAddress ?? address.streetAddress;
    address.city = city ?? address.city;
    address.state = state ?? address.state;
    address.country = country ?? address.country;
    address.postalCode = postalCode ?? address.postalCode;
    address.isDefault = isDefault ?? address.isDefault;

    await addressDoc.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
