import React from 'react';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';

interface CabBlock {
    cabType: string;
    estimatedPrice: number;
    distance: number;
    duration: number;
    vehicleId?: number;
}

interface CabCategoryResultsProps {
    blocks: CabBlock[];
    onSelect: (block: CabBlock) => void;
    selectedType?: string;
}

const CabCategoryResults: React.FC<CabCategoryResultsProps> = ({ blocks, onSelect, selectedType }) => {
    
    const getCabIcon = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes('12')) return 'assets/img/icons/bus-icon.svg';
        if (t.includes('suv')) return 'assets/img/icons/car-parts-01.svg';
        return 'assets/img/icons/car-parts-05.svg';
    };

    const getSeats = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes('12')) return '12+1';
        if (t.includes('suv')) return '6+1';
        return '4+1';
    };

    if (blocks.length === 0) {
        return (
            <div className="text-center py-5">
                <h4 className="text-gray-500">No cab estimates found for this route.</h4>
            </div>
        );
    }

    return (
        <div className="cab-list-container">
            <h3>Choose your ride</h3>
            <div className="cab-items-wrapper">
                {blocks.map((block, index) => (
                    <div 
                        key={index}
                        className={`cab-modern-item ${selectedType === block.cabType ? 'selected' : ''}`}
                        onClick={() => onSelect(block)}
                    >
                        <div className="cab-price-group order-2 ms-4 text-end">
                            <span className="price">₹{Math.round(block.estimatedPrice)}</span>
                            <span className="estimate-label">Total Estimate</span>
                        </div>

                        <div className="cab-info-group order-1">
                            <div className="text-end me-3">
                                <div className="d-flex align-items-center justify-content-end gap-2 mb-1">
                                    {block.cabType.toLowerCase().includes('suv') || block.cabType.toLowerCase().includes('lux') ? (
                                        <span className="badge-elite">Elite Choice</span>
                                    ) : (
                                        <span className="badge-value">Best Value</span>
                                    )}
                                    <h4 className="mb-0 text-black font-extrabold">{block.cabType}</h4>
                                </div>
                                <div className="d-flex align-items-center justify-content-end gap-2 text-muted small">
                                    <span className="fw-medium">{getSeats(block.cabType)} Seats</span>
                                    <span>•</span>
                                    <span className="fw-medium">{Math.round(block.duration)} min away</span>
                                </div>
                            </div>
                            <div className="cab-icon-box">
                                <ImageWithBasePath 
                                    src={getCabIcon(block.cabType)} 
                                    alt={block.cabType}
                                    width={55}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <p className="small text-muted text-end mt-4 px-3">
                <i className="feather icon-info me-1"></i>
                Pricing includes all taxes and tolls for the selected route.
            </p>
        </div>
    );
};

export default CabCategoryResults;
