export const assetMetadata = (user: any) => {
    const metadata = {
        creator: user.key.publicKey,
        create_at: new Date().toISOString()
    }
    
    return metadata;
};
