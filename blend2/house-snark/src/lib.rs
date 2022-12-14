mod environment;
mod relations;
pub mod serialization;

pub use environment::{CircuitField, NonUniversalProvingSystem, RawKeys, SomeProvingSystem};
#[cfg(feature = "deposit")]
pub use relations::blender::DepositRelation;
#[cfg(feature = "withdraw")]
pub use relations::blender::WithdrawRelation;
#[cfg(any(feature = "deposit", feature = "withdraw"))]
pub use relations::blender::{
    bytes_from_note, compute_note, note_from_bytes, MerklePath, MerkleRoot, Note, Nullifier,
    TokenAmount, TokenId, Trapdoor,
};
#[cfg(feature = "linear")]
pub use relations::LinearEqRelation;
#[cfg(feature = "merkle_tree")]
pub use relations::MerkleTreeRelation;
#[cfg(feature = "xor")]
pub use relations::XorRelation;
