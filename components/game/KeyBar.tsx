'use client';

import { KeyId, KEY_TYPES } from '@/lib/game-engine';
import { Button } from '@/components/ui/button';

interface KeyBarProps {
  allowedKeys: KeyId[];
  selectedKey: KeyId | null;
  onKeySelect: (key: KeyId) => void;
}

export function KeyBar({ allowedKeys, selectedKey, onKeySelect }: KeyBarProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {allowedKeys.map((keyId) => {
        const key = KEY_TYPES[keyId];
        const isSelected = selectedKey === keyId;

        return (
          <Button
            key={keyId}
            onClick={() => onKeySelect(keyId)}
            variant={isSelected ? 'default' : 'outline'}
            size="lg"
            className="flex flex-col items-center gap-2 h-auto py-3 px-6 min-w-[120px] transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              borderColor: isSelected ? key.color : undefined,
              backgroundColor: isSelected ? key.color : undefined,
              boxShadow: isSelected ? `0 0 20px ${key.color}40` : undefined,
            }}
          >
            <span className="text-4xl transition-transform duration-200 group-hover:scale-110">{key.icon}</span>
            <div className="text-center">
              <div className="font-bold text-base">{key.name}</div>
              <div className="text-xs opacity-90 font-medium mt-0.5">{key.description}</div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}