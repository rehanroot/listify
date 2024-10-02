import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdManagement = () => {
    const [ads, setAds] = useState([]);
    const [adTitle, setAdTitle] = useState('');
    const [adDescription, setAdDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);

    const fetchAds = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL_JAVA}/api/ads`); // Java API endpoint
            setAds(response.data);
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to fetch ads');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAd = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL_JAVA}/api/ads`, {
                title: adTitle,
                description: adDescription,
            });
            alert(response.data.message);
            fetchAds();
            setAdTitle('');
            setAdDescription('');
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to create ad');
        } finally {
            setCreating(false);
        }
    };

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Ad Management</h2>
            <form onSubmit={handleCreateAd} className="mb-4">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ad Title"
                        value={adTitle}
                        onChange={(e) => setAdTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        placeholder="Ad Description"
                        value={adDescription}
                        onChange={(e) => setAdDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={creating}>
                    {creating ? 'Creating...' : 'Create Ad'}
                </button>
            </form>

            <h3>Existing Ads</h3>
            {loading ? (
                <p>Loading ads...</p>
            ) : (
                <ul className="list-group">
                    {ads.map(ad => (
                        <li key={ad.id} className="list-group-item">
                            <h5>{ad.title}</h5>
                            <p>{ad.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdManagement;
