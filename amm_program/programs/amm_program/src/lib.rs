use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount};
use anchor_spl::token_2022::{self, Token2022};

// Replace with your actual program ID after deployment
// declare_id!("GitqprRo8hM4V1Z7AcikDJpjYsyXXv5anyJDhE5aX6cq");
declare_id!("GitqprRo8hM4V1Z7AcikDJpjYsyXXv5anyJDhE5aX6cq");

#[program]
pub mod amm_program {
    use super::*;

    // Create a new AMM pool for Token-2022 with allowed transfer hooks
    pub fn create_pool(
        ctx: Context<CreatePool>,
        fee_bps: u16,
        allowed_hook: Pubkey,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.pool;
        pool.token_a_mint = ctx.accounts.token_a_mint.key();
        pool.token_b_mint = ctx.accounts.token_b_mint.key();
        pool.fee_bps = fee_bps;
        pool.allowed_hook = allowed_hook;
        pool.bump = ctx.bumps.pool;
        Ok(())
    }

    // Add liquidity to the pool
    pub fn add_liquidity(ctx: Context<AddLiquidity>, amount_a: u64, amount_b: u64) -> Result<()> {
        // Transfer Token A from user to pool
        let decimals_a = ctx.accounts.token_a_mint.decimals;
        let cpi_accounts_a = token_2022::TransferChecked {
            from: ctx.accounts.user_token_a.to_account_info(),
            to: ctx.accounts.pool_token_a.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
            mint: ctx.accounts.token_a_mint.to_account_info(),
        };
        let cpi_ctx_a = CpiContext::new(ctx.accounts.token_2022_program.to_account_info(), cpi_accounts_a);
        token_2022::transfer_checked(cpi_ctx_a, amount_a, decimals_a)?;

        // Transfer Token B from user to pool
        let decimals_b = ctx.accounts.token_b_mint.decimals;
        let cpi_accounts_b = token_2022::TransferChecked {
            from: ctx.accounts.user_token_b.to_account_info(),
            to: ctx.accounts.pool_token_b.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
            mint: ctx.accounts.token_b_mint.to_account_info(),
        };
        let cpi_ctx_b = CpiContext::new(ctx.accounts.token_2022_program.to_account_info(), cpi_accounts_b);
        token_2022::transfer_checked(cpi_ctx_b, amount_b, decimals_b)?;

        // TODO: Mint LP tokens to user (not implemented in this scaffold)
        Ok(())
    }

    // Remove liquidity from the pool
    pub fn remove_liquidity(_ctx: Context<RemoveLiquidity>, _lp_amount: u64) -> Result<()> {
        // TODO: Burn LP tokens from user and transfer underlying assets back
        Ok(())
    }

    // Swap tokens, enforcing transfer hook logic
    pub fn swap(ctx: Context<Swap>, amount_in: u64, _min_amount_out: u64) -> Result<()> {
        let _pool = &ctx.accounts.pool;
        // TODO: Enforce transfer hook whitelist for Token-2022 when Anchor SPL supports it
        // For now, use standard Token-2022 transfer_checked as a placeholder
        let decimals = ctx.accounts.token_a_mint.decimals;
        let cpi_accounts = token_2022::TransferChecked {
            from: ctx.accounts.user_token_a.to_account_info(),
            to: ctx.accounts.pool_token_a.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
            mint: ctx.accounts.token_a_mint.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_2022_program.to_account_info(), cpi_accounts);
        token_2022::transfer_checked(cpi_ctx, amount_in, decimals)?;
        // TODO: Calculate amount_out, transfer to user, update pool reserves
        Ok(())
    }

    // Whitelist a hook program (admin only)
    pub fn whitelist_hook(ctx: Context<WhitelistHook>, hook_program: Pubkey) -> Result<()> {
        let whitelist = &mut ctx.accounts.whitelist;
        whitelist.hook_programs.push(hook_program);
        Ok(())
    }
}

// Pool state
#[account]
pub struct Pool {
    pub token_a_mint: Pubkey,
    pub token_b_mint: Pubkey,
    pub fee_bps: u16,
    pub allowed_hook: Pubkey, // Only one for now; can be Vec<Pubkey> for multiple
    pub bump: u8,
}

// Whitelist state
#[account]
pub struct Whitelist {
    pub hook_programs: Vec<Pubkey>,
}

// Contexts for each instruction
#[derive(Accounts)]
pub struct CreatePool<'info> {
    #[account(init, payer = payer, space = 8 + 32 + 32 + 2 + 32 + 1, seeds = [b"pool", token_a_mint.key().as_ref(), token_b_mint.key().as_ref()], bump)]
    pub pool: Account<'info, Pool>,
    pub token_a_mint: Account<'info, Mint>,
    pub token_b_mint: Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddLiquidity<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_token_a: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_token_b: Account<'info, TokenAccount>,
    #[account(mut)]
    pub pool_token_a: Account<'info, TokenAccount>,
    #[account(mut)]
    pub pool_token_b: Account<'info, TokenAccount>,
    pub token_a_mint: Account<'info, Mint>,
    pub token_b_mint: Account<'info, Mint>,
    pub token_2022_program: Program<'info, Token2022>,
}

#[derive(Accounts)]
pub struct RemoveLiquidity<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(mut)]
    pub user: Signer<'info>,
    // TODO: Add LP token accounts and pool token accounts
    pub token_a_mint: Account<'info, Mint>,
    pub token_b_mint: Account<'info, Mint>,
    pub token_2022_program: Program<'info, Token2022>,
}

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_token_a: Account<'info, TokenAccount>,
    #[account(mut)]
    pub pool_token_a: Account<'info, TokenAccount>,
    pub token_a_mint: Account<'info, Mint>,
    pub token_2022_program: Program<'info, Token2022>,
}

#[derive(Accounts)]
pub struct WhitelistHook<'info> {
    #[account(mut)]
    pub whitelist: Account<'info, Whitelist>,
    pub admin: Signer<'info>,
}

#[error_code]
pub enum AmmError {
    #[msg("Transfer hook is not whitelisted.")]
    HookNotWhitelisted,
}
