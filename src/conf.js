const conf ={
    appwrite_url:String(import.meta.env.VITE_APP_APPWRITE_URL),
    project_id:String(import.meta.env.VITE_APP_PROJECT_ID),
    database_id:String(import.meta.env.VITE_APP_DATABASE_ID),
    collection_id:String(import.meta.env.VITE_APP_COLLECTION_ID)
}
export default conf;