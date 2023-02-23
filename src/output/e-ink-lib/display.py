#!/usr/bin/python
# -*- coding:utf-8 -*-
import sys
import os
libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'e-ink-lib', 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

import logging

from lib import epd7in5_V2
import textwrap
from PIL import Image, ImageDraw, ImageFont

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

logging.basicConfig(level = logging.DEBUG)

screen_mode = None

logging.info("1. Instantiating epd")
epd = epd7in5_V2.EPD()
logging.info("1. Initializing epd ")
epd.init()
logging.info("1. Clearing")
epd.Clear()

def font_type(line_len):
  font24 = ImageFont.truetype(os.path.join(libdir, 'Font.ttc'), 24)
  font35 = ImageFont.truetype(os.path.join(libdir, 'Font.ttc'), 35)

  return font24 if line_len > 15 else font35

def vertical_position(line_len):
  return 10 if line_len > 50 else 30 if line_len > 20 else 50 if line_len > 15 else 70

def init_and_clear():
  logging.info("Initializing epd ")
  epd.init()
  logging.info("Clearing")
  epd.Clear()

  return epd

def show_text(text, wrap = True):
  epd = init_and_clear()
  logging.info("1")

  line_len = len(text)
  logging.info("2")

  font = font_type(line_len)
  width = 30 # TODO: confirm
  y_pos = vertical_position(line_len)
  logging.info("3")

  wrapper = textwrap.TextWrapper(width=width)
  text_wrapped = wrapper.fill(text=text) if wrap else text
  logging.info("4")

  logging.info("Writing..{}".format(text_wrapped))
  Himage = Image.new('1', (epd.height, epd.width), 255)  # 255: clear the frame
  draw = ImageDraw.Draw(Himage)
  draw.text((10,y_pos), text_wrapped, font=font, fill=0)
  logging.info("5")

  epd.display(epd.getbuffer(Himage))

#### SETUP
try:
  show_text(sys.argv[1], False)
  epd.sleep()

except IOError as e:
  logging.info(e)
  sys.exit()
except KeyboardInterrupt:
  logging.info("ctrl + c:")
  # wake from sleep
  epd.init()
  epd.Clear() # clean for now, remove?
  epd7in5_V2.epdconfig.module_exit()
  sys.exit()

