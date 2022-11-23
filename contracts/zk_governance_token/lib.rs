#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

use openbrush::contracts::psp22::PSP22;
#[openbrush::contract]
pub mod my_psp22 {
    // imports from ink!
	use ink_storage::traits::SpreadAllocate;
	use openbrush::contracts::ownable::*;
    
    // imports from openbrush
	
	use openbrush::traits::Storage;
	use openbrush::contracts::psp22::extensions::mintable::*;
	use openbrush::contracts::psp22::extensions::metadata::*;
    
    #[ink(storage)]
    #[derive(Default, SpreadAllocate, Storage)]
    pub struct AlephVote {
    	#[storage_field]
		psp22: psp22::Data,
		#[storage_field]
		ownable: ownable::Data,
		#[storage_field]
		metadata: metadata::Data,
    }
    
    // Section contains default implementation without any modifications
	impl PSP22 for AlephVote {}
	impl Ownable for AlephVote {}
	impl PSP22Mintable for AlephVote {
		#[ink(message)]
		#[openbrush::modifiers(only_owner)]
		fn mint(
            &mut self,
            account: AccountId,
			amount: Balance
        ) -> Result<(), PSP22Error> {
			self._mint(account, amount)
		}
	}
	impl PSP22Metadata for AlephVote {}
    
    impl AlephVote {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance) -> Self {
            ink_lang::codegen::initialize_contract(|_instance: &mut AlephVote|{
				_instance._mint(_instance.env().caller(), initial_supply).expect("Should mint"); 
				_instance._init_with_owner(_instance.env().caller());
				_instance.metadata.name = Some("alephVoteVer1".to_string());
				_instance.metadata.symbol = Some("AV1".to_string());
				_instance.metadata.decimals = 18;
			})
        }
    }
}
#[cfg(test)]
mod tests {
    use super::*;
    use ink_lang as ink;

    #[ink::test]
    fn total_supply_works() {
        let test_token = my_psp22::AlephVote::new(1000);
        assert_eq!(test_token.total_supply(), 1000);
    }
}