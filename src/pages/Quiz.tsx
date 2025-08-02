
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { Shield, AlertTriangle, CheckCircle, X } from 'lucide-react';

const Quiz = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);

  const phishingItems = [
    { id: 'suspicious-email', text: 'Email asking for your password', type: 'phishing' },
    { id: 'bank-website', text: 'Official bank website (https://)', type: 'safe' },
    { id: 'urgent-link', text: 'Click here NOW or lose your account!', type: 'phishing' },
    { id: 'family-photo', text: 'Photo from your grandchild', type: 'safe' },
  ];

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDrop = (e: React.DragEvent, dropZone: string) => {
    e.preventDefault();
    if (draggedItem) {
      setDroppedItems(prev => ({ ...prev, [draggedItem]: dropZone }));
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setDroppedItems({});
    setShowResults(false);
  };

  const getCorrectZone = (itemId: string) => {
    const item = phishingItems.find(i => i.id === itemId);
    return item?.type === 'phishing' ? 'phishing-zone' : 'safe-zone';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Security Quiz</h1>
            <p className="text-2xl text-white/80">Drag items to the correct category</p>
          </div>

          <GlassCard className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Drop Zones */}
              <div className="space-y-8">
                <div
                  className="border-4 border-dashed border-red-300 rounded-2xl p-8 min-h-48 bg-red-50 transition-all duration-300"
                  onDrop={(e) => handleDrop(e, 'phishing-zone')}
                  onDragOver={handleDragOver}
                >
                  <div className="text-center">
                    <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
                    <h3 className="text-2xl font-bold text-red-700 mb-2">Phishing / Dangerous</h3>
                    <p className="text-red-600">Drop suspicious items here</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {Object.entries(droppedItems)
                      .filter(([_, zone]) => zone === 'phishing-zone')
                      .map(([itemId, _]) => {
                        const item = phishingItems.find(i => i.id === itemId);
                        const isCorrect = getCorrectZone(itemId) === 'phishing-zone';
                        return (
                          <div key={itemId} className={`p-3 rounded-lg text-sm ${
                            showResults 
                              ? isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              : 'bg-white text-black'
                          }`}>
                            {item?.text}
                            {showResults && (
                              isCorrect ? <CheckCircle className="inline ml-2" size={16} /> : <X className="inline ml-2" size={16} />
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div
                  className="border-4 border-dashed border-green-300 rounded-2xl p-8 min-h-48 bg-green-50 transition-all duration-300"
                  onDrop={(e) => handleDrop(e, 'safe-zone')}
                  onDragOver={handleDragOver}
                >
                  <div className="text-center">
                    <Shield className="mx-auto text-green-500 mb-4" size={48} />
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Safe / Trustworthy</h3>
                    <p className="text-green-600">Drop safe items here</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {Object.entries(droppedItems)
                      .filter(([_, zone]) => zone === 'safe-zone')
                      .map(([itemId, _]) => {
                        const item = phishingItems.find(i => i.id === itemId);
                        const isCorrect = getCorrectZone(itemId) === 'safe-zone';
                        return (
                          <div key={itemId} className={`p-3 rounded-lg text-sm ${
                            showResults 
                              ? isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              : 'bg-white text-black'
                          }`}>
                            {item?.text}
                            {showResults && (
                              isCorrect ? <CheckCircle className="inline ml-2" size={16} /> : <X className="inline ml-2" size={16} />
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Draggable Items */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">Drag these items:</h3>
                <div className="space-y-4">
                  {phishingItems
                    .filter(item => !droppedItems[item.id])
                    .map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      className="p-6 bg-white/90 backdrop-blur rounded-xl border-2 border-gray-200 cursor-move hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <p className="text-lg font-medium text-black">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              {!showResults ? (
                <button
                  onClick={checkAnswers}
                  disabled={Object.keys(droppedItems).length !== phishingItems.length}
                  className="bg-black text-white px-12 py-4 rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Submit Answers
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="bg-white border-2 border-black text-black px-12 py-4 rounded-xl text-xl font-bold hover:bg-black hover:text-white transition-all duration-300"
                >
                  Try Again
                </button>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
