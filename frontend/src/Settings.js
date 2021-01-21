import React, {useEffect, useState} from 'react';

const Settings = ({nonce, urls}) => {
    const [apiKey, setApiKey] = useState('')
    const [suiteId, setSuiteId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isSaving, setSaving] = useState(false)
    const [isGetting, setGetting] = useState(true)
    const updateApiKey = (event) => setApiKey(event.target.value)
    const updateSuiteId = (event) => setSuiteId(event.target.value)
    const updateSettings = async (event) => {
        event.preventDefault()
        setSaving(true)
        await fetch(urls.settings, {
            body: JSON.stringify({apiKey, suiteId}),
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-WP-Nonce': nonce
            }),
        })
        // check if API key and suite ID are valid
        try {
            // await getSuite(suiteId)
            setErrorMessage('')
            setSuccessMessage('Settings saved and validated with API!')
        } catch (error) {
            setErrorMessage(error.message)
            setSuccessMessage('')
        }
        setSaving(false)
    }
    useEffect(() => {
        const getSettings = async () => {
            let json = null
            let elapsed = false
            setGetting(true)
            // display loading for a minimum amount of time to prevent flashing
            setTimeout(() => {
                elapsed = true
                if (json) {
                    setGetting(false)
                }
            }, 300)
            const response = await fetch('https://cms.gierwatowski.pl/blog/wp-json/wc/v3/products/292', {
                headers: new Headers({'Authorization': 'Basic Y2tfY2MwMzkxYjg1Yzg5YzU4MjRhNDU3YjVhMjdhMGM0NGJiNTc5NDZlNDpjc19lMmZiNWZiMzAwY2E3ODI4YWEyZmIwZTBiOWQ3NTIwZTQ2NmQ1Y2Y5'})
            })
            json = await response.json()
            console.log(json.value)

            if (elapsed) {
                setGetting(false)
            }
        }
        getSettings()
    }, [nonce, urls])
    if (isGetting) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <h1>PC Konfigurator</h1>
            <form onSubmit={updateSettings}>
                <p><label>WooCommerce Client ID: <input type="text" value={suiteId} onChange={updateSuiteId}/></label></p>
                <p><label>WooCommerce API Key: <input type="password" value={apiKey} onChange={updateApiKey}/></label></p>

                {errorMessage && <div className="error settings-error"><p>{errorMessage}</p></div>}
                {successMessage && <div className="notice notice-success"><p>{successMessage}</p></div>}
                <p>
                    <button type="submit" className="button button-primary" disabled={isSaving}>Submit</button>
                </p>
            </form>
        </div>
    );
}

export default Settings;
