use ark_ff::PrimeField;
use ark_r1cs_std::{
    prelude::{AllocVar, EqGadget},
    uint32::UInt32,
};
use ark_relations::r1cs::{ConstraintSynthesizer, ConstraintSystemRef, SynthesisError};
use ark_serialize::CanonicalSerialize;
use clap::Args;

use crate::relations::GetPublicInput;

/// Linear equation relation: a*x + b = y
///
/// Relation with:
///  - 1 private witness (x)
///  - 3 constants        (a, b, y)
#[derive(Copy, Clone, Eq, PartialEq, Hash, Debug, Args)]
pub struct LinearEqRelation {
    /// constant (a slope)
    #[clap(long, default_value = "2")]
    pub a: u32,
    /// private witness
    #[clap(long, default_value = "7")]
    pub x: u32,
    /// constant(an intercept)
    #[clap(long, default_value = "5")]
    pub b: u32,
    /// constant
    #[clap(long, default_value = "19")]
    pub y: u32,
}

impl<Field: PrimeField> ConstraintSynthesizer<Field> for LinearEqRelation {
    fn generate_constraints(self, cs: ConstraintSystemRef<Field>) -> Result<(), SynthesisError> {
        // Watch out for overflows!!!

        let x = UInt32::new_witness(ark_relations::ns!(cs, "x"), || Ok(&self.x))?;

        let b = UInt32::new_constant(ark_relations::ns!(cs, "b"), &self.b)?;

        let y = UInt32::new_constant(ark_relations::ns!(cs, "y"), &self.y)?;

        let mut left = std::iter::repeat(x)
            .take(self.a as usize)
            .collect::<Vec<UInt32<Field>>>();

        left.push(b);

        UInt32::addmany(&left)?.enforce_equal(&y)
    }
}

impl<CircuitField: PrimeField + CanonicalSerialize> GetPublicInput<CircuitField>
    for LinearEqRelation
{
}
